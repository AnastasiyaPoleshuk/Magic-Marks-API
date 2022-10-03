const CONSTANTS = {
  PORT: 5000,
  HEALTHCHECK: {
    PORT: 5000,
    Application: ' Magic Mark API',
    Status: 'Healthy'
  },
  MOCK_USER: {
    Email: "user@mail.com",
    Password: "123"
  },
  MOCK_TOKEN: '123-456-890',
  MOCK_SUBJECTS: [
    { SubjectId: 1, SubjectName: "Математика", AverageMark: 8 },
    { SubjectId: 2, SubjectName: "Английский", AverageMark: 9 },
    { SubjectId: 3, SubjectName: "Русский язык", AverageMark: 8 },
    { SubjectId: 4, SubjectName: "Физкультура", AverageMark: 9 },
    { SubjectId: 5, SubjectName: "ИЗО", AverageMark: 10 },
  ],
  MOCK_MARKS: [
    { SubjectId: 1, Marks: [8, 9] },
    { SubjectId: 2, Marks: [9] },
    { SubjectId: 3, Marks: [8, 7, 8] },
    { SubjectId: 4, Marks: [9, 9, 10] },
    { SubjectId: 5, Marks: [10, 9, 10] },
  ],
  DIGITS: 1,
};

module.exports.CONSTANTS = CONSTANTS;
