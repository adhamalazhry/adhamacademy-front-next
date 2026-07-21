export function teacherBasePath(teacherId) {
  return `/teacher/${teacherId}`;
}

export function teacherDashboardPath(teacherId) {
  return `${teacherBasePath(teacherId)}/dashboard`;
}

export function teacherStudentsPath(teacherId) {
  return `${teacherBasePath(teacherId)}/students`;
}

export function teacherStudentPath(teacherId, studentId) {
  return `${teacherStudentsPath(teacherId)}/${studentId}`;
}

export function teacherStudentProfilePath(teacherId, studentId) {
  return `${teacherStudentPath(teacherId, studentId)}/profile`;
}

export function teacherStudentReportsPath(teacherId, studentId) {
  return `${teacherStudentPath(teacherId, studentId)}/reports`;
}

export function teacherStudentReportNewPath(teacherId, studentId) {
  return `${teacherStudentReportsPath(teacherId, studentId)}/new`;
}

export function teacherStudentReportDetailsPath(teacherId, studentId, reportId) {
  return `${teacherStudentReportsPath(teacherId, studentId)}/${reportId}`;
}

export function teacherStudentReportEditPath(teacherId, studentId, reportId) {
  return `${teacherStudentReportDetailsPath(teacherId, studentId, reportId)}/edit`;
}

export function teacherStudentRevisionPath(teacherId, studentId) {
  return `${teacherStudentPath(teacherId, studentId)}/revision`;
}

export function teacherStudentHomeworkPath(teacherId, studentId) {
  return `${teacherStudentPath(teacherId, studentId)}/homework`;
}

export function teacherStudentSchedulePath(teacherId, studentId) {
  return `${teacherStudentPath(teacherId, studentId)}/schedule`;
}

export function teacherStudentProgressPath(teacherId, studentId) {
  return `${teacherStudentPath(teacherId, studentId)}/progress`;
}

export function teacherStudentSubscriptionPath(teacherId, studentId) {
  return `${teacherStudentPath(teacherId, studentId)}/subscription`;
}

export function teacherSchedulePath(teacherId) {
  return `${teacherBasePath(teacherId)}/schedule`;
}

export function teacherReportsPath(teacherId) {
  return `${teacherBasePath(teacherId)}/reports`;
}

export function teacherRevisionPath(teacherId) {
  return `${teacherBasePath(teacherId)}/revision`;
}

export function teacherHomeworkPath(teacherId) {
  return `${teacherBasePath(teacherId)}/homework`;
}

export function teacherFinancialPath(teacherId) {
  return `${teacherBasePath(teacherId)}/financial`;
}

export function teacherAccountPath(teacherId) {
  return `${teacherBasePath(teacherId)}/account`;
}

export function teacherNotificationsPath(teacherId) {
  return `${teacherBasePath(teacherId)}/notifications`;
}