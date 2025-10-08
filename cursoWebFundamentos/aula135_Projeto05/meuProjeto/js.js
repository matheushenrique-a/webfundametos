document.addEventListener('DOMContentLoaded', () => {
  const fields = document.querySelectorAll('input[id], textarea');
  const textarea = document.getElementById('mensagem');
  const contador = document.getElementById('contador');
  const max = textarea ? Number(textarea.getAttribute('maxlength')) || 0 : 0;

  function setState(field, state) {
    field.classList.remove('valid','invalid');
    if (state === 'valid') field.classList.add('valid');
    if (state === 'invalid') field.classList.add('invalid');
  }

  function updateCounter() {
    if (!textarea || !contador) return;
    const len = textarea.value.length;
    contador.textContent = `${len} / ${max}`;
    if (len === 0) contador.style.color = 'white';
    else if (len === max) contador.style.color = 'orange';
    else contador.style.color = (textarea.checkValidity() ? 'lightgreen' : 'salmon');
  }

  fields.forEach(field => {

    field.addEventListener('focus', () => {
      setState(field, field.checkValidity() ? 'valid' : 'invalid');
      if (field === textarea) updateCounter();
    });

    field.addEventListener('input', () => {
      const hasValue = field.value.trim().length > 0;
      if (hasValue) {
        setState(field, field.checkValidity() ? 'valid' : 'invalid');
      } else {

        if (document.activeElement === field) {
          setState(field, field.checkValidity() ? 'valid' : 'invalid');
        } else {

          field.classList.remove('valid','invalid');
        }
      }
      if (field === textarea) updateCounter();
    });

    field.addEventListener('blur', () => {
      if (field.value.trim().length === 0) {
        field.classList.remove('valid','invalid');
      } else {
        setState(field, field.checkValidity() ? 'valid' : 'invalid');
      }
      if (field === textarea) updateCounter();
    });

    if (field.value.trim().length > 0) {
      setState(field, field.checkValidity() ? 'valid' : 'invalid');
    } else {
      field.classList.remove('valid','invalid');
    }
  });

  updateCounter();
});