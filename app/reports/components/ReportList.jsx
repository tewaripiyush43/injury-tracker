"use client";
import styles from "./ReportList.module.css";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/app/context/Store";
import { useMutation, useQuery } from "@apollo/client";
import { GET_INJURY_REPORTS } from "@/app/api/graphql/queries";

import { Actions } from "./Actions";

export default function ReportList() {
  const { userData, logout } = useContext(StoreContext);
  const [reports, setReports] = useState([]);
  const [searchVariables, setSearchVariables] = useState({
    sortBy: "reportDate",
    searchName: "",
    injuryStart: null,
    injuryEnd: null,
    reportStart: null,
    reportEnd: null,
  });
  // const [skipInitialFetch, setSkipInitialFetch] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_INJURY_REPORTS, {
    variables: {
      id: userData?.id,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setReports(data?.getInjuryReports);
    },
  });

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (
      ["injuryStart", "injuryEnd", "reportStart", "reportEnd"].includes(field)
    ) {
      formattedValue = value ? new Date(value).toISOString() : null;
    }

    setSearchVariables((prevSearchVariables) => ({
      ...prevSearchVariables,
      [field]: formattedValue,
    }));
  };

  const handleSearch = () => {
    refetch({
      id: userData?.id,
      ...searchVariables,
    }).then((data) => {
      setReports(data?.data?.getInjuryReports);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.reportListContainer}>
      <div className={styles.filterContainer}>
        <div className={styles.row}>
          <div className={styles.filterSection}>
            <label className={styles.label}>
              Search by Name:
              <input
                type="text"
                placeholder="Search by Reporter Name"
                className={styles.input}
                value={searchVariables.searchName}
                onChange={(e) =>
                  handleInputChange("searchName", e.target.value)
                }
              />
            </label>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.label}>
              Sort By:
              <select
                value={searchVariables.sortBy}
                className={styles.select}
                onChange={(e) => handleInputChange("sortBy", e.target.value)}
              >
                <option value="injuryDateTime">Injury Date & Time</option>
                <option value="reportDate">Report Date</option>
              </select>
            </label>
          </div>
        </div>
        <div className={styles.row}>
          {searchVariables.sortBy === "injuryDateTime" && (
            <div className={styles.filterSection}>
              <label className={styles.label}>
                Injury Start:
                <input
                  type="datetime-local"
                  className={styles.input}
                  value={
                    searchVariables?.injuryStart === null
                      ? ""
                      : searchVariables?.injuryStart.slice(0, 16)
                  }
                  onChange={(e) =>
                    handleInputChange("injuryStart", e.target.value)
                  }
                />
              </label>
              <label className={styles.label}>
                Injury End:
                <input
                  type="datetime-local"
                  className={styles.input}
                  value={
                    searchVariables?.injuryEnd === null
                      ? ""
                      : searchVariables?.injuryEnd.slice(0, 16)
                  }
                  onChange={(e) =>
                    handleInputChange("injuryEnd", e.target.value)
                  }
                />
              </label>
            </div>
          )}
          {searchVariables.sortBy === "reportDate" && (
            <div className={styles.filterSection}>
              <label className={styles.label}>
                Report Start:
                <input
                  type="date"
                  className={styles.input}
                  value={
                    searchVariables?.reportStart === null
                      ? ""
                      : searchVariables?.reportStart.slice(0, 10)
                  }
                  onChange={(e) =>
                    handleInputChange("reportStart", e.target.value)
                  }
                />
              </label>
              <label className={styles.label}>
                Report End:
                <input
                  type="date"
                  className={styles.input}
                  value={
                    searchVariables?.reportEnd === null
                      ? ""
                      : searchVariables?.reportEnd.slice(0, 10)
                  }
                  onChange={(e) =>
                    handleInputChange("reportEnd", e.target.value)
                  }
                />
              </label>
            </div>
          )}
        </div>

        <div className={styles.row}>
          <button className={styles.button} onClick={handleSearch}>
            Search
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setSearchVariables({
                sortBy: "reportDate",
                searchName: "",
                injuryStart: null,
                injuryEnd: null,
                reportStart: null,
                reportEnd: null,
              });
            }}
          >
            Reset filters
          </button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {reports?.length > 0 && (
            <thead>
              <tr className={styles.tableRow}>
                <th className={styles.tableHeading}>Reporter Name</th>
                <th className={styles.tableHeading}>Report Date</th>
                <th className={styles.tableHeading}>Injury Date & Time</th>
                <th className={styles.tableHeading}>Actions</th>
              </tr>
            </thead>
          )}
          <tbody>
            {reports?.length > 0 ? (
              reports.map((report) => (
                <tr className={styles.tableRow} key={report.id}>
                  <td className={styles.tableData}>{report.reporterName}</td>
                  <td className={styles.tableData}>
                    {new Date(report.reportDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td className={styles.tableData}>
                    {new Date(report.injuryDateTime).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td className={styles.tableData}>
                    <Actions reportId={report.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr className={styles.tableRow}>
                <td className={styles.tableData} colSpan="4">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
