/* login.js — D.A.V. College Portal Login Logic */

const MOCK_USERS = {
  student: { id: 'student123', pass: 'dav@2025' },
  teacher: { id: 'teacher123', pass: 'dav@2025' }
};

const panels = ['roleSelector', 'studentForm', 'teacherForm'];

function showOnly(id) {
  panels.forEach(p => {
    const el = document.getElementById(p);
    el.classList.toggle('hidden', p !== id);
  });
}

function showLogin(role) {
  showOnly(role === 'student' ? 'studentForm' : 'teacherForm');
  const focusId = role === 'student' ? 'studentId' : 'teacherId';
  setTimeout(() => document.getElementById(focusId)?.focus(), 50);
}

function showSelector() {
  document.getElementById('studentError').classList.add('hidden');
  document.getElementById('teacherError').classList.add('hidden');
  showOnly('roleSelector');
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else                            { input.type = 'password'; btn.textContent = '👁'; }
}

function handleLogin(event, role) {
  event.preventDefault();

  const isStudent = role === 'student';
  const idField   = isStudent ? 'studentId'      : 'teacherId';
  const passField = isStudent ? 'studentPass'     : 'teacherPass';
  const spinnerId = isStudent ? 'studentSpinner'  : 'teacherSpinner';
  const errId     = isStudent ? 'studentError'    : 'teacherError';
  const submitId  = isStudent ? 'studentSubmit'   : 'teacherSubmit';

  const enteredId   = document.getElementById(idField).value.trim();
  const enteredPass = document.getElementById(passField).value;

  document.getElementById(errId).classList.add('hidden');

  const btn = document.getElementById(submitId);
  btn.querySelector('.btn-login-text').textContent = 'Signing in…';
  document.getElementById(spinnerId).classList.remove('hidden');
  btn.disabled = true;

  setTimeout(() => {
    const { id, pass } = MOCK_USERS[role];
    if (enteredId === id && enteredPass === pass) {
      // Save session
      sessionStorage.setItem('dav_user_role', role);
      sessionStorage.setItem('dav_user_id',   enteredId);

      // Redirect to correct portal
      if (isStudent) {
        window.location.href = 'student/dashboard.html';
      } else {
        // Teacher portal — coming soon
        window.location.href = 'teacher/dashboard.html';
      }
    } else {
      btn.querySelector('.btn-login-text').textContent = 'Sign In';
      document.getElementById(spinnerId).classList.add('hidden');
      btn.disabled = false;
      document.getElementById(errId).classList.remove('hidden');
    }
  }, 1200);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const s = document.getElementById('studentForm');
    const t = document.getElementById('teacherForm');
    if (!s.classList.contains('hidden') || !t.classList.contains('hidden')) showSelector();
  }
});

document.addEventListener('DOMContentLoaded', () => showOnly('roleSelector'));