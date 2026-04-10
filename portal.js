/* ============================================================
   D.A.V. College Hoshiarpur — Student Portal
   portal.js  (shared across all portal pages)
   ============================================================ */

/* ──────────────────────────────────────────────
   MOCK CREDENTIALS  (matches login.js)
────────────────────────────────────────────── */
const MOCK_USERS = {
  student: { id: 'student123', pass: 'dav@2025' },
  teacher: { id: 'teacher123', pass: 'dav@2025' }
};

/* ──────────────────────────────────────────────
   STUDENT DATA
────────────────────────────────────────────── */
const STUDENT_PROFILE = {
  name:     'Arjun Verma',
  rollNo:   'student123',
  program:  'B.Sc. (Computer Science)',
  semester: '5th Semester',
  section:  'A',
  initials: 'AV',
  year:     '2023–26',
  dob:      '14 March 2004',
  phone:    '+91 98765 43210',
  email:    'arjun.verma@davhsp.edu.in',
  address:  'House No. 42, Model Town, Hoshiarpur, Punjab 146001',
};

const STUDENT_DATA = {
  attendance: {
    'Data Structures':       82,
    'Database Management':   67,
    'Web Technologies':      91,
    'Discrete Mathematics':  58,
    'Operating Systems':     76,
  },
  semesters: {
    3: {
      label: 'Semester III',
      sgpa: 7.2,
      percentage: 66.4,
      subjects: [
        { name: 'Fundamentals of CS',  code: 'CS301', internal: 17, external: 50, total: 67, grade: 'B' },
        { name: 'Mathematics – II',    code: 'MA301', internal: 15, external: 46, total: 61, grade: 'C' },
        { name: 'Communication Skills',code: 'EN301', internal: 19, external: 55, total: 74, grade: 'B' },
        { name: 'Programming in C',    code: 'CS302', internal: 16, external: 48, total: 64, grade: 'C' },
        { name: 'PC Software Lab',     code: 'CS303', internal: 21, external: 54, total: 75, grade: 'A' },
      ],
    },
    4: {
      label: 'Semester IV',
      sgpa: 7.5,
      percentage: 69.0,
      subjects: [
        { name: 'Data Structures',     code: 'CS401', internal: 18, external: 52, total: 70, grade: 'B' },
        { name: 'Mathematics – III',   code: 'MA401', internal: 16, external: 45, total: 61, grade: 'C' },
        { name: 'OOP with C++',        code: 'CS402', internal: 20, external: 58, total: 78, grade: 'A' },
        { name: 'Computer Networks',   code: 'CS403', internal: 15, external: 49, total: 64, grade: 'C' },
        { name: 'OOP Lab',             code: 'CS404', internal: 22, external: 57, total: 79, grade: 'A' },
      ],
    },
    5: {
      label: 'Semester V (Current)',
      sgpa: 7.8,
      percentage: 71.6,
      subjects: [
        { name: 'Data Structures',      code: 'CS501', internal: 19, external: 54, total: 73, grade: 'B' },
        { name: 'Database Management',  code: 'CS502', internal: 17, external: 50, total: 67, grade: 'B' },
        { name: 'Web Technologies',     code: 'CS503', internal: 23, external: 63, total: 86, grade: 'A' },
        { name: 'Discrete Mathematics', code: 'CS504', internal: 15, external: 46, total: 61, grade: 'C' },
        { name: 'Operating Systems',    code: 'CS505', internal: 20, external: 57, total: 77, grade: 'A' },
      ],
    },
  },
  timetable: {
    // periods: [time_label, Mon, Tue, Wed, Thu, Fri, Sat]
    periods: [
      { time: '9:00 – 10:00',   mon: 'DS',   tue: 'Math',  wed: 'Web',  thu: 'DBMS', fri: 'OS',   sat: null  },
      { time: '10:00 – 11:00',  mon: 'DBMS', tue: 'Web',   wed: 'DS',   thu: 'Math', fri: 'DS',   sat: 'Lab' },
      { time: '11:00 – 12:00',  mon: 'Math', tue: 'OS',    wed: 'DBMS', thu: 'Web',  fri: 'Math', sat: 'Lab' },
      { time: '12:00 – 1:00',   mon: null,   tue: null,    wed: null,   thu: null,   fri: null,   sat: null, isLunch: true },
      { time: '1:00 – 2:00',    mon: 'Web',  tue: 'DS',    wed: 'OS',   thu: null,   fri: 'DBMS', sat: 'Lab' },
      { time: '2:00 – 3:00',    mon: 'OS',   tue: 'DBMS',  wed: 'Math', thu: 'Web',  fri: null,   sat: null  },
      { time: '3:00 – 4:00',    mon: 'Lab',  tue: null,    wed: 'Lab',  thu: 'OS',   fri: null,   sat: null  },
    ],
    subjectMap: {
      'DS':   { full: 'Data Structures',      code: 'CS501', faculty: 'Dr. Priya Sharma',    room: 'CS-201', color: 'ds'   },
      'DBMS': { full: 'Database Management',  code: 'CS502', faculty: 'Mr. Suresh Anand',    room: 'CS-202', color: 'dbms' },
      'Web':  { full: 'Web Technologies',     code: 'CS503', faculty: 'Ms. Kavita Bhatia',   room: 'CS-203', color: 'web'  },
      'Math': { full: 'Discrete Mathematics', code: 'CS504', faculty: 'Prof. R.K. Sharma',   room: 'MA-101', color: 'math' },
      'OS':   { full: 'Operating Systems',    code: 'CS505', faculty: 'Dr. Naveen Grover',   room: 'CS-204', color: 'os'   },
      'Lab':  { full: 'Practical / Lab',      code: 'CS5L1', faculty: 'Dr. Priya Sharma',    room: 'CS-Lab', color: 'lab'  },
    }
  }
};

/* ──────────────────────────────────────────────
   QUERIES  (localStorage)
────────────────────────────────────────────── */
const QUERIES_KEY = 'dav_queries';

function seedQueries() {
  if (localStorage.getItem(QUERIES_KEY)) return;
  const defaults = [
    {
      id: 'q_seed_1',
      subject: 'Data Structures',
      text: 'Can you explain how AVL tree rotations work after an insertion? I understand the concept but get confused on when to do single vs double rotation.',
      date: '3 Nov 2024', status: 'answered',
      reply: 'An AVL rotation depends on the balance factor. Single rotation (LL or RR) when the imbalance is on one side. Double rotation (LR or RL) when the heavy node zigzags. Think of it as first fixing the child, then the parent.',
      repliedBy: 'Dr. Priya Sharma'
    },
    {
      id: 'q_seed_2',
      subject: 'Web Technologies',
      text: 'What is the difference between position: absolute and position: fixed in CSS?',
      date: '8 Nov 2024', status: 'answered',
      reply: 'position: absolute is relative to its nearest positioned ancestor. position: fixed stays fixed to the viewport regardless of scrolling. Use fixed for sticky navbars!',
      repliedBy: 'Ms. Kavita Bhatia'
    },
    {
      id: 'q_seed_3',
      subject: 'Discrete Mathematics',
      text: 'I\'m confused about the difference between a relation being "reflexive" vs "symmetric". Can you give an example using a set?',
      date: '18 Nov 2024', status: 'pending',
      reply: null, repliedBy: null
    },
    {
      id: 'q_seed_4',
      subject: 'Operating Systems',
      text: 'In the Banker\'s algorithm, what exactly is a "safe state"? I understand the steps but not the intuition.',
      date: '20 Nov 2024', status: 'pending',
      reply: null, repliedBy: null
    },
  ];
  localStorage.setItem(QUERIES_KEY, JSON.stringify(defaults));
}

function getAllQueries() {
  try { return JSON.parse(localStorage.getItem(QUERIES_KEY)) || []; }
  catch { return []; }
}
function saveQueries(q) { localStorage.setItem(QUERIES_KEY, JSON.stringify(q)); }

function addQuery(subject, text) {
  const queries = getAllQueries();
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const q = { id: 'q_' + Date.now(), subject, text, date, status: 'pending', reply: null, repliedBy: null };
  queries.unshift(q);
  saveQueries(queries);
  return q;
}

function replyQuery(id, reply, teacher) {
  const queries = getAllQueries();
  const idx = queries.findIndex(q => q.id === id);
  if (idx === -1) return false;
  queries[idx].status = 'answered';
  queries[idx].reply = reply;
  queries[idx].repliedBy = teacher;
  saveQueries(queries);
  return true;
}

/* ──────────────────────────────────────────────
   AUTH GUARD
────────────────────────────────────────────── */
function requireStudentLogin() {
  const role = sessionStorage.getItem('dav_user_role');
  if (role !== 'student') {
    window.location.href = '../login.html';
  }
}

function requireTeacherLogin() {
  const role = sessionStorage.getItem('dav_user_role');
  if (role !== 'teacher') {
    window.location.href = '../login.html';
  }
}

function portalLogout() {
  sessionStorage.removeItem('dav_user_role');
  sessionStorage.removeItem('dav_user_id');
  window.location.href = '../login.html';
}

function teacherLogout() {
  sessionStorage.removeItem('dav_user_role');
  sessionStorage.removeItem('dav_user_id');
  window.location.href = '../login.html';
}

/* ──────────────────────────────────────────────
   UTILITY
────────────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

function gradeClass(grade) {
  return { A: 'grade-a', B: 'grade-b', C: 'grade-c', D: 'grade-d', F: 'grade-f' }[grade] || 'grade-d';
}

function attendanceBadge(pct) {
  if (pct >= 90) return { label: 'Excellent', cls: 'badge-success' };
  if (pct >= 75) return { label: 'Safe',      cls: 'badge-success' };
  if (pct >= 60) return { label: 'Low',       cls: 'badge-warn'    };
  return            { label: 'At Risk',   cls: 'badge-danger'  };
}

function ringOffset(pct) {
  return (188.5 * (1 - pct / 100)).toFixed(2);
}

/* ──────────────────────────────────────────────
   SIDEBAR ACTIVE LINK
────────────────────────────────────────────── */
function setActiveSidebar() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.ps-link').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

/* ──────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  seedQueries();
  setActiveSidebar();
});