"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [injuries, setInjuries] = useState([]);
  const imageRef = useRef(null);

  const handleImageClick = (e) => {
    const { clientX, clientY } = e;
    const rect = imageRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    // console.log(`x: ${x}, y: ${y}`);
    setInjuries([...injuries, { injuryOf: "", details: "", x, y }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...injuries];
    list[index][name] = value;
    setInjuries(list);
  };

  useEffect(() => {
    console.log("injuries", injuries);
  }, [injuries]);

  return (
    <div className={styles.createReportContainer}>
      <h2>Create Report</h2>
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
              <div className={styles.injuryNumber}>{index + 1}</div>
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
                <label htmlFor="details">Details </label>
                <textarea
                  type="text"
                  name="details"
                  rows={10}
                  value={injury.details}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
