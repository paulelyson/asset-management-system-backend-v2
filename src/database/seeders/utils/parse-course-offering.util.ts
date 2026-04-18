import { Types } from 'mongoose';
import { RawCourseOffering, RawScheduleEntry } from '../data/course-offering.data';

// ─── Resolution Maps ──────────────────────────────────────────────────────────

export interface ResolutionMaps {
  /** Course.code → Course._id */
  courseMap: Map<string, Types.ObjectId>;
  /** User.idNumber → User._id */
  userMap: Map<string, Types.ObjectId>;
  /** Location.name → Location._id */
  locationMap: Map<string, Types.ObjectId>;
}

// ─── Resolved Types ───────────────────────────────────────────────────────────

export interface ResolvedScheduleEntry {
  day: string;
  startTime: string | null;
  endTime: string | null;
  isOpen: boolean;
  location: Types.ObjectId;
}

export interface ResolvedCourseOffering {
  code: string;
  course: Types.ObjectId;
  instructor: Types.ObjectId;
  schedule: ResolvedScheduleEntry[];
}

// ─── Parser ───────────────────────────────────────────────────────────────────

function resolveSchedule(
  entry: RawScheduleEntry,
  locationMap: Map<string, Types.ObjectId>,
  offeringCode: string,
): ResolvedScheduleEntry {
  const locationId = locationMap.get(entry.location);
  if (!locationId) {
    throw new Error(
      `[CourseOffering ${offeringCode}] Location not found: "${entry.location}". ` +
      `Seed locations before seeding course offerings.`,
    );
  }

  const isOpen = entry.startTime === null || entry.endTime === null;

  return {
    day: entry.day,
    startTime: isOpen ? null : entry.startTime,
    endTime: isOpen ? null : entry.endTime,
    isOpen,
    location: locationId,
  };
}

export function parseCourseOffering(
  raw: RawCourseOffering,
  maps: ResolutionMaps,
): ResolvedCourseOffering {
  const { courseMap, userMap, locationMap } = maps;

  const courseId = courseMap.get(raw.course);
  if (!courseId) {
    throw new Error(
      `[CourseOffering ${raw.code}] Course not found: "${raw.course}". ` +
      `Seed courses before seeding course offerings.`,
    );
  }

  const instructorId = userMap.get(raw.instructor);
  if (!instructorId) {
    throw new Error(
      `[CourseOffering ${raw.code}] Instructor not found: idNumber "${raw.instructor}". ` +
      `Seed users before seeding course offerings.`,
    );
  }

  const schedule = raw.schedule.map((entry) =>
    resolveSchedule(entry, locationMap, raw.code),
  );

  return {
    code: raw.code,
    course: courseId,
    instructor: instructorId,
    schedule,
  };
}