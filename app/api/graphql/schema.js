import { gql } from "graphql-tag";
import { GraphQLScalarType, Kind } from "graphql";
import prisma from "@/lib/prisma";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    nickname: String!
    createdAt: DateTime
    reports: [InjuryReport]
  }

  type InjuryReport {
    id: ID!
    reporterName: String!
    injuryDateTime: DateTime!
    reportDate: DateTime!
    updatedDate: DateTime!
    user: User!
    areas: [InjuryArea]
  }

  type InjuryArea {
    id: ID!
    areaNumber: Int!
    injuryOf: String!
    top: Float!
    left: Float!
    injuryDetails: String!
    report: InjuryReport
  }

  type Query {
    getUserByEmail(id: ID!): User
    getInjuryReports(
      id: ID!
      sortBy: String
      searchName: String
      injuryStart: DateTime
      injuryEnd: DateTime
      reportStart: DateTime
      reportEnd: DateTime
    ): [InjuryReport]
    getInjuryReportById(id: ID!): InjuryReport
  }

  type Mutation {
    createAuth0User(email: String!, nickname: String!): User
    createInjuryReport(report: CreateInjuryReportInput!): InjuryReport
    updateInjuryReport(report: UpdateInjuryReportInput!): InjuryReport
    deleteInjuryReport(id: ID!): InjuryReport
  }

  input CreateInjuryReportInput {
    reporterName: String!
    injuryDateTime: DateTime!
    userId: ID!
    areas: [InjuryAreaInput!]!
  }

  input InjuryAreaInput {
    areaNumber: Int!
    injuryOf: String!
    top: Float!
    left: Float!
    injuryDetails: String!
  }

  input UpdateInjuryReportInput {
    id: ID!
    reporterName: String
    injuryDateTime: DateTime
    areas: [UpdateInjuryAreaInput!]!
  }

  input UpdateInjuryAreaInput {
    id: ID!
    areaNumber: Int
    injuryOf: String
    top: Float
    left: Float
    injuryDetails: String
  }

  scalar DateTime
`;

const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description:
    "A date and time string in ISO 8601 format (e.g., 2023-01-15T14:30:00Z)",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  DateTime: DateTimeScalar,
  Query: {
    getUserByEmail: async (_, { email }) => {
      try {
        return await prisma.user.findUnique({
          where: {
            email,
          },
          include: {
            reports: {
              include: {
                areas: true,
              },
            },
          },
        });
      } catch (error) {
        throw new Error(`Failed to fetch user by ID: ${error.message}`);
      }
    },
    getInjuryReports: async (
      _,
      { id, searchName, injuryStart, injuryEnd, reportStart, reportEnd }
    ) => {
      try {
        const filter = {
          userId: id,
          AND: [
            searchName
              ? {
                  reporterName: {
                    contains: searchName,
                    mode: "insensitive",
                  },
                }
              : null,
            {
              OR: [
                injuryStart && injuryEnd
                  ? { injuryDateTime: { gte: injuryStart, lte: injuryEnd } }
                  : injuryStart
                  ? { injuryDateTime: { gte: injuryStart } }
                  : injuryEnd
                  ? { injuryDateTime: { lte: injuryEnd } }
                  : null,
                reportStart && reportEnd
                  ? { reportDate: { gte: reportStart, lte: reportEnd } }
                  : reportStart
                  ? { reportDate: { gte: reportStart } }
                  : reportEnd
                  ? { reportDate: { lte: reportEnd } }
                  : null,
              ].filter((condition) => condition),
            },
          ].filter((condition) => condition),
        };

        const reports = await prisma.injuryReport.findMany({
          where: filter,
          include: {
            areas: true,
          },
        });

        return reports;
      } catch (error) {
        throw new Error(`Failed to fetch injury reports: ${error.message}`);
      }
    },
    getInjuryReportById: async (_, { id }) => {
      try {
        return await prisma.injuryReport.findUnique({
          where: {
            id,
          },
          include: {
            areas: true,
          },
        });
      } catch (error) {
        throw new Error(
          `Failed to fetch injury report by ID: ${error.message}`
        );
      }
    },
  },
  Mutation: {
    createAuth0User: async (_, { email, nickname }) => {
      try {
        console.log("Creating new Auth0 user:", email, nickname);
        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
          include: {
            reports: {
              include: {
                areas: true,
              },
            },
          },
        });

        if (existingUser) {
          return existingUser;
        }

        const newUser = await prisma.user.create({
          data: {
            email: email,
            nickname: nickname,
          },
          include: {
            reports: {
              include: {
                areas: true,
              },
            },
          },
        });

        console.log("Created new user:", newUser);
        return newUser;
      } catch (error) {
        throw new Error(`Failed to create Auth0 user: ${error.message}`);
      }
    },
    createInjuryReport: async (_, { report }) => {
      try {
        const newReport = await prisma.injuryReport.create({
          data: {
            reporterName: report.reporterName,
            injuryDateTime: report.injuryDateTime,
            User: {
              connect: { id: report.userId },
            },
            areas: {
              create: report.areas,
            },
          },
          include: {
            areas: true,
          },
        });

        return newReport;
      } catch (error) {
        throw new Error(`Failed to create injury report: ${error.message}`);
      }
    },
    updateInjuryReport: async (_, { report }) => {
      try {
        const updatedReport = await prisma.injuryReport.update({
          where: {
            id: report.id,
          },
          data: {
            reporterName: report.reporterName,
            injuryDateTime: report.injuryDateTime,
            areas: {
              update: report.areas.map((area) => ({
                where: {
                  id: area.id,
                },
                data: {
                  areaNumber: area.areaNumber,
                  injuryOf: area.injuryOf,
                  top: area.top,
                  left: area.left,
                  injuryDetails: area.injuryDetails,
                },
              })),
            },
          },
          include: {
            areas: true,
          },
        });

        return updatedReport;
      } catch (error) {
        throw new Error(`Failed to update injury report: ${error.message}`);
      }
    },
    deleteInjuryReport: async (_, { id }) => {
      try {
        const deletedReport = await prisma.injuryReport.delete({
          where: {
            id,
          },
        });
        return deletedReport;
      } catch (error) {
        throw new Error(`Failed to delete injury report: ${error.message}`);
      }
    },
  },
};
