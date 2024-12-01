/* RENDERIZAÇÃO DA LISTA DE DADOS */
const listBook = document.querySelector("#book-list");
function renderList(doc) {
  let li = document.createElement("li");
  let autor = document.createElement("span");
  let titulo = document.createElement("span");
  let excluir = document.createElement("div");

  // console.log(doc.id);
  li.setAttribute("data-id", doc.titulo);
  autor.textContent = doc.autor;
  titulo.textContent = doc.titulo;

  li.appendChild(titulo);
  li.appendChild(autor);

  listBook.appendChild(li);
}


// Obter a instância do Firestore (supondo que já tenha inicializado o Firebase)
const db = getFirestore(app);  // 'app' é a instância do seu Firebase

/* LISTA OS DADOS DA COLEÇÃO DO FIRESTORE */
const livrosCollection = collection(db, "libri-collection");  // Referência para a coleção

getDocs(livrosCollection)
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  })
  .catch((error) => {
    console.error("Erro ao listar os documentos: ", error);
  });


/* INSERÇÃO DE DADOS */
const form = document.querySelector("#add-book-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // alert('Formulário funcionando!');
  db.collection("libri-collection")
    .add({
      autor: form.autor.value,
      titulo: form.titulo.value,
    })
    .then(() => {
      form.autor.value = "";
      form.titulo.value = "";
      window.location.reload();
    });
});
