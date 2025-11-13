export interface StudentPayload {
  name: string;
  student_id?: string;
  grade: string;
  section?: string;
  // optional ISO date string (e.g. "2008-05-12") or any preferred format
  date_of_birth?: string;
  // parent/guardian contact
  parent_phone?: string;
  photo_base64?: string | null;
}
