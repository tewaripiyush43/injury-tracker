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
    getUserById(id: ID!): User
    getInjuryReports(id: ID!): [InjuryReport]
    getInjuryReportById(id: ID!): InjuryReport
  }

  type Mutation {
    createAuth0User(id: ID!, email: String!, nickname: String!): User
    createInjuryReport(report: CreateInjuryReportInput!): InjuryReport
    updateInjuryReport(report: UpdateInjuryReportInput!): InjuryReport
    deleteInjuryReport(id: ID!): InjuryReport
  }

  input CreateInjuryReportInput {
    reporterName: String!
    injuryDateTime: DateTime!
    userId: ID!
    injuries: [InjuryAreaInput!]!
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
    injuries: [UpdateInjuryAreaInput!]!
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
    getUserById: async (_, { id }) => {
      try {
        return await prisma.user.findUnique({
          where: {
            id,
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
    getInjuryReports: async (_, { id }) => {
      try {
        return await prisma.injuryReport.findMany({
          where: {
            userId: id,
          },
          include: {
            areas: true,
          },
        });
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
    createAuth0User: async (_, { id, email, nickname }) => {
      try {
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (existingUser) {
          return existingUser;
        }

        // Create a new user
        const newUser = await prisma.user.create({
          data: {
            id: id,
            email: email,
            nickname: nickname,
          },
        });

        return newUser;
      } catch (error) {
        throw new Error(`Failed to create Auth0 user: ${error.message}`);
      }
    },
    createInjuryReport: async (_, { report }) => {
      try {
        // Create a new injury report along with associated areas
        const newReport = await prisma.injuryReport.create({
          data: {
            reporterName: report.reporterName,
            injuryDateTime: report.injuryDateTime,
            userId: report.userId,
            areas: {
              create: report.injuries.map((injury) => ({
                areaNumber: injury.areaNumber,
                top: injury.top,
                left: injury.left,
                injuryOf: injury.injuryOf,
                injuryDetails: injury.injuryDetails,
              })),
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
        // Update an existing injury report
        const updatedReport = await prisma.injuryReport.update({
          where: {
            id: report.id,
          },
          data: {
            reporterName: report.reporterName,
            areas: {
              updateMany: report.injuries.map((injury) => ({
                where: { id: injury.id },
                data: {
                  areaNumber: injury.areaNumber,
                  injuryOf: injury.injuryOf,
                  top: injury.top,
                  left: injury.left,
                  injuryDetails: injury.injuryDetails,
                },
              })),
            },
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
          include: {
            areas: true,
          },
        });

        return deletedReport;
      } catch (error) {
        throw new Error(`Failed to delete injury report: ${error.message}`);
      }
    },
  },
};
