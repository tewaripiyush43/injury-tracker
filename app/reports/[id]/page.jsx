"use client";
import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { StoreContext } from "@/app/context/Store";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_INJURY_REPORT_BY_ID,
  UPDATE_INJURY_REPORT,
  DELETE_INJURY_REPORT,
} from "@/app/api/graphql/queries";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup";

export default function page({ params }) {
  const router = useRouter();
  const [report, setReport] = useState({});
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const { userData, setUserData, logout } = useContext(StoreContext);
  const [editable, setEditable] = useState(false);
  const { data, loading, error } = useQuery(GET_INJURY_REPORT_BY_ID, {
    variables: { id: params.id },
    fetchPolicy: "cache-and-network",
  });
  const [updateInjuryReport, { data: mutationData }] =
    useMutation(UPDATE_INJURY_REPORT);
  const [deleteInjuryReport, { data: mutationData2 }] =
    useMutation(DELETE_INJURY_REPORT);

  const imageRef = useRef(null);

  useEffect(() => {
    if (data) {
      setReport(data?.getInjuryReportById);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && data) {
      setReport(data?.getInjuryReportById);
    }
  }, [loading, data]);

  const handleUpdateReport = async () => {
    const areas = report?.areas?.map((injury) => {
      return {
        id: injury.id,
        areaNumber: injury.areaNumber,
        injuryOf: injury.injuryOf,
        top: injury.top,
        left: injury.left,
        injuryDetails: injury.injuryDetails,
      };
    });

    const updatedReport = {
      id: report?.id,
      reporterName: report?.reporterName,
      injuryDateTime: report?.injuryDateTime,
      areas,
    };

    const { data } = await updateInjuryReport({
      variables: { report: updatedReport },
    });
    // console.log("data", data);
  };

  const handleDeleteReport = async () => {
    const { data } = await deleteInjuryReport({
      variables: { id: report?.id },
    });
    setDeletePopupOpen(false);
    router.replace("/reports");
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "reporterName" || name === "injuryDateTime") {
      if (name === "injuryDateTime") {
        const isoDateTime = new Date(value).toISOString().slice(0, 16);
        setReport({ ...report, [name]: isoDateTime });
      } else {
        setReport({ ...report, [name]: value });
      }
    } else {
      setReport((prevReport) => ({
        ...prevReport,
        areas: prevReport?.areas?.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    }
  };

  useEffect(() => {
    // console.log("userData", userData);
    setReport({ ...report, userId: userData?.id });
  }, [userData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;
  if (!userData) return <div>Please login too see report</div>;

  return (
    <div className={styles.createReportContainer}>
      <div className={styles.reportButtonsContainer}>
        <h2>
          Report
          {editable ? (
            <SaveOutlined
              title="Save Report"
              className={`${styles.reportButton} ${styles.reportButtonUpdate}`}
              onClick={() => {
                setEditable(!editable);
                handleUpdateReport();
              }}
            />
          ) : (
            <EditOutlined
              title="Edit Report"
              className={`${styles.reportButton} ${styles.reportButtonUpdate}`}
              onClick={() => {
                setEditable(!editable);
              }}
            />
          )}
          <DeleteOutlined
            title="Delete Report"
            className={`${styles.reportButton} ${styles.reportButtonDelete}`}
            onClick={() => {
              setDeletePopupOpen(true);
            }}
          />
        </h2>
      </div>

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
            disabled={!editable}
            value={report?.reporterName ? report?.reporterName : ""}
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
            disabled={!editable}
            value={
              report?.injuryDateTime ? report?.injuryDateTime.slice(0, 16) : ""
            }
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <Image
            ref={imageRef}
            src="/images/BodyMapSecond.png"
            alt="body map"
            width={700}
            height={500}
          />
          {report?.areas?.map((injury, index) => {
            return (
              <div
                key={index}
                className={styles.circularLabelContainer}
                style={{ top: injury.top - 10, left: injury.left - 10 }}
              >
                <div className={styles.circularLabel}>{index + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.injuryDetails}>
        {report?.areas?.map((injury, index) => {
          return (
            <div key={index} className={styles.injuryDetail}>
              <div className={styles.injuryNumber}>{injury.areaNumber}</div>
              <div className={styles.injuryInput}>
                <label htmlFor="injuryOf">Injury of </label>
                <input
                  type="text"
                  name="injuryOf"
                  disabled={!editable}
                  value={injury.injuryOf ? injury.injuryOf : ""}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className={styles.injuryInput}>
                <label htmlFor="injuryDetails">Details </label>
                <textarea
                  type="text"
                  name="injuryDetails"
                  rows={10}
                  disabled={!editable}
                  value={injury.injuryDetails ? injury.injuryDetails : ""}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
          );
        })}
        <div className={styles.reportBottomButtonsContainer}>
          {editable && (
            <div
              className={styles.reportBottomButton}
              title="Save Report"
              onClick={() => {
                setEditable(!editable);
                handleUpdateReport();
              }}
            >
              <p>Update Report</p>
              <SaveOutlined className={`${styles.reportButton}`} />
            </div>
          )}
          <div
            className={styles.reportBottomButton}
            title="Delete Report"
            onClick={() => {
              setDeletePopupOpen(true);
            }}
          >
            <p>Delete Report</p>
            <DeleteOutlined className={`${styles.reportButton}`} />
          </div>
        </div>
      </div>
      {isDeletePopupOpen && (
        <DeleteConfirmationPopup
          onClose={() => setDeletePopupOpen(false)}
          onDelete={handleDeleteReport}
        />
      )}
    </div>
  );
}
