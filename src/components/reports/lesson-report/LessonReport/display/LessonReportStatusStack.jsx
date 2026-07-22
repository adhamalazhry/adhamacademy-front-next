import LessonStatusMessage from "../feedback/LessonStatusMessage";

export default function LessonReportStatusStack({ successMessage, errorMessage }) {
  return (
    <>
      <LessonStatusMessage message={successMessage} type="success" />
      <LessonStatusMessage message={errorMessage} type="error" />
    </>
  );
}
