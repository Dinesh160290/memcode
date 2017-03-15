import { db } from '~/db/init.js';

const indexByCourseId = (courseId) =>
  db.any(
    'SELECT * FROM problem WHERE course_id = ${courseId} ORDER BY created_at',
    { courseId }
  );

const indexByIds = (ids) => {
  if (ids.length === 0) return [];
  const stringOfIds = ids.join(', '); // (1, 3, 17)
  return db.any(
    `SELECT * FROM problem WHERE id IN (${stringOfIds})`
  );
};

const create = (problem) =>
  db.one(
    "INSERT INTO problem (content, explanation, course_id, created_at) VALUES (${content}, ${explanation}, ${courseId}, ${created_at}) RETURNING *",
    {
      content: problem.content,
      explanation: problem.explanation,
      courseId: problem.courseId,
      created_at: new Date()
    }
  );

const update = (problem, problemId) =>
  db.one(
    "UPDATE problem SET content=${content}, explanation=${explanation} WHERE id=${id} RETURNING *",
    {
      content: problem.content,
      explanation: problem.explanation,
      id: problemId
    }
  );

const destroy = (id) =>
  db.none('delete from problem where id=${id}', { id });

export { indexByCourseId, indexByIds, create, update, destroy };
