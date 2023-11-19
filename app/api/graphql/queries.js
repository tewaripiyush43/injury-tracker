// "use client";
import gql from "graphql-tag";

export const GET_USER_BY_Email = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      nickname
      reports {
        id
        reporterName
        injuryDateTime
        reportDate
        updatedDate
        areas {
          id
          areaNumber
          injuryOf
          top
          left
          injuryDetails
        }
      }
    }
  }
`;

export const GET_INJURY_REPORTS = gql`
  query GetInjuryReports(
    $id: ID!
    $sortBy: String
    $searchName: String
    $injuryStart: DateTime
    $injuryEnd: DateTime
    $reportStart: DateTime
    $reportEnd: DateTime
  ) {
    getInjuryReports(
      id: $id
      sortBy: $sortBy
      searchName: $searchName
      injuryStart: $injuryStart
      injuryEnd: $injuryEnd
      reportStart: $reportStart
      reportEnd: $reportEnd
    ) {
      id
      reporterName
      injuryDateTime
      reportDate
      areas {
        id
        areaNumber
        injuryOf
        top
        left
        injuryDetails
      }
    }
  }
`;

export const GET_INJURY_REPORT_BY_ID = gql`
  query getInjuryReportById($id: ID!) {
    getInjuryReportById(id: $id) {
      id
      reporterName
      injuryDateTime
      reportDate
      updatedDate
      areas {
        id
        areaNumber
        injuryOf
        top
        left
        injuryDetails
      }
    }
  }
`;

export const CREATE_AUTH0_USER = gql`
  mutation createAuth0User($email: String!, $nickname: String!) {
    createAuth0User(email: $email, nickname: $nickname) {
      id
      email
      nickname
    }
  }
`;

export const CREATE_INJURY_REPORT = gql`
  mutation createInjuryReport($report: CreateInjuryReportInput!) {
    createInjuryReport(report: $report) {
      id
      reporterName
      injuryDateTime
      reportDate
      updatedDate
      areas {
        id
        areaNumber
        injuryOf
        top
        left
        injuryDetails
      }
    }
  }
`;

export const UPDATE_INJURY_REPORT = gql`
  mutation updateInjuryReport($report: UpdateInjuryReportInput!) {
    updateInjuryReport(report: $report) {
      id
      reporterName
      injuryDateTime
      reportDate
      updatedDate
      areas {
        id
        areaNumber
        injuryOf
        top
        left
        injuryDetails
      }
    }
  }
`;

export const DELETE_INJURY_REPORT = gql`
  mutation deleteInjuryReport($id: ID!) {
    deleteInjuryReport(id: $id) {
      reporterName
    }
  }
`;
