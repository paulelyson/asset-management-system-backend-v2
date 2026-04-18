/**
 * Raw seed data for CourseOfferings.
 *
 * Natural keys are used intentionally here — this is a source file, not a
 * DB document. The seeder resolves these to ObjectIds before inserting.
 *
 *   course     → Course.code
 *   instructor → User.idNumber
 *   location   → Location.name
 *
 * Null startTime/endTime means the schedule entry is OPEN (no fixed time).
 */

export interface RawScheduleEntry {
  day: string;
  startTime: string | null;
  endTime: string | null;
  location: string;
}

export interface RawCourseOffering {
  code: string;
  course: string;
  instructor: string;
  schedule: RawScheduleEntry[];
}

export const COURSE_OFFERINGS_DATA: RawCourseOffering[] = [
 // example format:
  {
    code: '0001', course: 'Chem 101', instructor: '123456789',
    schedule: [
      { day: 'Monday',    startTime: '10:30', endTime: '11:30', location: 'Room 101' },
      { day: 'Wednesday', startTime: '10:30', endTime: '11:30', location: 'Room 101' },
      { day: 'Friday',    startTime: '10:30', endTime: '11:30', location: 'Room 101' },
    ],
  }
];