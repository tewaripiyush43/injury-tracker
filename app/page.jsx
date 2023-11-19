"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { StoreContext } from "@/app/context/Store";
import { useMutation } from "@apollo/client";
import { CREATE_INJURY_REPORT } from "@/app/api/graphql/queries";

export default function Home() {
  const { userData, setUserData, logout, isLoading } = useContext(StoreContext);
  const [createInjuryReport, { data: mutationData }] =
    useMutation(CREATE_INJURY_REPORT);
  const [report, setReport] = useState({
    reporterName: "",
    injuryDateTime: "",
    userId: "",
    areas: [],
  });
  const [injuries, setInjuries] = useState([]);
  const imageRef = useRef(null);

  const handleImageClick = (e) => {
    const { clientX, clientY } = e;
    const rect = imageRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const areaNumber = injuries.length + 1;
    setInjuries([
      ...injuries,
      { areaNumber, injuryOf: "", injuryDetails: "", x, y },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...injuries];

    if (name === "reporterName" || name === "injuryDateTime") {
      if (name === "injuryDateTime") {
        const isoDateTime = new Date(value).toISOString().slice(0, 16);
        setReport({ ...report, [name]: isoDateTime });
      } else {
        setReport({ ...report, [name]: value });
      }
    } else {
      list[index][name] = value;
      setInjuries(list);
    }
  };

  const handleCreateReport = async () => {
    const areas = injuries.map((injury) => {
      return {
        areaNumber: injury.areaNumber,
        injuryOf: injury.injuryOf,
        top: injury.y,
        left: injury.x,
        injuryDetails: injury.injuryDetails,
      };
    });
    const reportData = {
      reporterName: report.reporterName,
      injuryDateTime: report.injuryDateTime,
      userId: report.userId,
      areas,
    };

    console.log("reportData", reportData);
    const result = await createInjuryReport({
      variables: {
        report: reportData,
      },
    });
    console.log("result", result?.data?.createInjuryReport);

    setUserData((prevUserData) => ({
      ...prevUserData,
      reports: [
        ...(prevUserData?.reports || []),
        result?.data?.createInjuryReport,
      ],
    }));

    setReport({
      reporterName: "",
      injuryDateTime: "",
      userId: userData?.id,
      areas: [],
    });
    setInjuries([]);
  };

  const handleResetReport = () => {
    setInjuries([]);
  };

  useEffect(() => {
    console.log("userData", userData);
    setReport({ ...report, userId: userData?.id });
  }, [userData]);

  if (isLoading) {
    return (
      <div className={styles.createReportContainer}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className={styles.createReportContainer}>
        <h2>Please Login to create report</h2>
      </div>
    );
  }

  return (
    <div className={styles.createReportContainer}>
      <h2>Create Report</h2>
      <div className={styles.reportDetails}>
        <div className={styles.reportInput}>
          <label className={styles.reportInputLabel} htmlFor="reporterName">
            Reporter Name:
          </label>
          <input
            className={styles.reportInputField}
            type="text"
            name="reporterName"
            placeholder="John Doe"
            value={report.reporterName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={styles.reportInput}>
          <label className={styles.reportInputLabel} htmlFor="injuryDateTime">
            Injuries Date and time:
          </label>
          <input
            className={styles.reportInputField}
            type="datetime-local"
            name="injuryDateTime"
            value={report.injuryDateTime}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <Image
            ref={imageRef}
            onClick={handleImageClick}
            src="/images/BodyMapSecond.png"
            alt="body map"
            width={700}
            height={500}
          />
          {injuries.map((injury, index) => {
            return (
              <div
                key={index}
                className={styles.circularLabelContainer}
                style={{ top: injury.y - 10, left: injury.x - 10 }}
              >
                <div className={styles.circularLabel}>{index + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.injuryDetails}>
        {injuries.length > 0 && <h3>Please give details of injuries</h3>}
        {injuries.map((injury, index) => {
          return (
            <div key={index} className={styles.injuryDetail}>
              <div className={styles.injuryNumber}>{injury.areaNumber}</div>
              <div className={styles.injuryInput}>
                <label htmlFor="injuryOf">Injury of </label>
                <input
                  type="text"
                  name="injuryOf"
                  value={injury.injuryOf}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className={styles.injuryInput}>
                <label htmlFor="injuryDetails">Details </label>
                <textarea
                  type="text"
                  name="injuryDetails"
                  rows={10}
                  value={injury.injuryDetails}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
          );
        })}
        {injuries.length > 0 && (
          <div className={styles.submitButtonContainer}>
            <button
              onClick={handleResetReport}
              className={`${styles.resetButton} ${styles.button} `}
            >
              Reset Report
            </button>
            <button
              onClick={handleCreateReport}
              className={`${styles.createButton} ${styles.button} `}
            >
              Create Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
