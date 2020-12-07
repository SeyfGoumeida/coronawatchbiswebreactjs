var btn = document.getElementById('btn-validate');

btn.addEventListener('click', updateBtn);

function updateBtn() {
  if (btn.value === 'VALIDATE') {
    btn.value = 'VALIDATED';
    btn.style.borderColor="#172B4D";
    btn.style.backgroundColor=" #cceeff";
    btn.style.color="#009F95";

  } else {
    btn.value = 'VALIDATE';
    btn.style.borderColor="#172B4D";
    btn.style.backgroundColor="#009F95";
    btn.style.color="white";
  }
}