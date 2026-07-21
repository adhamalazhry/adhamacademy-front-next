import TeacherFormFields from "./TeacherFormFields";

export default function TeacherBasicInfoForm({
  register,
  errors,
}) {
  return <TeacherFormFields register={register} errors={errors} />;
}