import { createMatrixAndCalculateWorkingHours } from './create-matrix-records';

export const createGroupMatrixAndCalculateRecords = async (
  records: Array<any>,
) => {
  const groupedRecords = records.reduce((acc, record) => {
    const date = new Date(record.registrationDate).toLocaleDateString('pt-BR');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});

  const groupedArray = Object.entries(groupedRecords).map(
    ([date, group]: any) => ({
      registrationDate: date,
      records: group,
    }),
  );

  return Promise.all(
    groupedArray.map(async ({ registrationDate, records: recordsDay }: any) => {
      return {
        registrationDate,
        hoursWorked: await createMatrixAndCalculateWorkingHours(
          recordsDay,
          true,
        ),
      };
    }),
  );
};
