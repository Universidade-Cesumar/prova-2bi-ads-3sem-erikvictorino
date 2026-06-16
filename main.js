const API_URL = 'https://683f3a4a1cd60dca33dcf5cb.mockapi.io/materiais';

function validarRetirada(estoqueAtual, quantidade) {
  if (quantidade <= 0) return false;
  if (quantidade > estoqueAtual) return false;
  return true;
}


function diasParaVencer(dataValidade) {
  if (!dataValidade) return null;
  const hoje = new Date();
  const validade = new Date(dataValidade);
  const diff = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));
  return diff;
}

function badgeValidade(dataValidade) {
  if (!dataValidade) return '';
  const dias = diasParaVencer(dataValidade);
  if (dias < 0) return `<span class="badge bg-danger badge-validade">Vencido</span>`;
  if (dias <= 30) return `<span class="badge bg-warning text-dark badge-validade">${dias}d para vencer</span>`;
  return `<span class="badge bg-success badge-validade">OK (${dias}d)</span>`;
}

function mostrarMensagem(elementId, texto, tipo = 'success') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${tipo} py-1 px-2 mb-0">${texto}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 3000);
}


async function carregarMateriais() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Erro ao carregar materiais');
    const materiais = await res.json();
    renderizarLista(materiais);
    atualizarDashboard(materiais);
  } catch (err) {
    console.error('Erro no GET:', err);
    document.getElementById('lista-materiais').innerHTML =
      '<tr><td colspan="5" class="text-danger">Erro ao carregar dados da API.</td></tr>';
  }
}

async function cadastrarMaterial() {
  const nome = document.getElementById('input-nome').value.trim();
  const quantidade = parseInt(document.getElementById('input-quantidade').value);
  const validade = document.getElementById('input-validade')?.value || '';
  const categoria = document.getElementById('input-categoria')?.value || 'consumo';

  if (!nome || isNaN(quantidade) || quantidade <= 0) {
    mostrarMensagem('msg-cadastro', 'Preencha o nome e uma quantidade válida.', 'warning');
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, quantidade, validade, categoria })
    });
    if (!res.ok) throw new Error('Erro no cadastro');
    mostrarMensagem('msg-cadastro', `Material "<strong>${nome}</strong>" cadastrado com sucesso!`);
    document.getElementById('input-nome').value = '';
    document.getElementById('input-quantidade').value = '';
    if (document.getElementById('input-validade')) document.getElementById('input-validade').value = '';
    carregarMateriais();
  } catch (err) {
    console.error('Erro no POST:', err);
    mostrarMensagem('msg-cadastro', 'Erro ao cadastrar. Verifique a URL da API.', 'danger');
  }
}

async function baixarMaterial(id, estoqueAtual) {
  const qtd = parseInt(document.getElementById('input-retirada').value);
  const solicitante = document.getElementById('input-solicitante')?.value.trim() || '';

  if (!validarRetirada(estoqueAtual, qtd)) {
    mostrarMensagem('msg-retirada', 'Quantidade inválida ou maior que o estoque disponível.', 'warning');
    return;
  }

  try {
    const novaQtd = estoqueAtual - qtd;
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantidade: novaQtd, ultimoSolicitante: solicitante })
    });
    if (!res.ok) throw new Error('Erro na baixa');
    mostrarMensagem('msg-retirada', `Retirada de <strong>${qtd}</strong> unidade(s) registrada.`);
    document.getElementById('input-retirada').value = '';
    carregarMateriais();
  } catch (err) {
    console.error('Erro no PUT:', err);
    mostrarMensagem('msg-retirada', 'Erro ao registrar retirada.', 'danger');
  }
}

async function excluirMaterial(id) {
  if (!confirm('Deseja excluir este material?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao excluir');
    carregarMateriais();
  } catch (err) {
    console.error('Erro no DELETE:', err);
    mostrarMensagem('msg-cadastro', 'Erro ao excluir material.', 'danger');
  }
}

function renderizarLista(materiais) {
  const busca = document.getElementById('input-busca')?.value.toLowerCase() || '';
  const lista = document.getElementById('lista-materiais');
  const filtrados = materiais.filter(m => m.nome.toLowerCase().includes(busca));

  if (filtrados.length === 0) {
    lista.innerHTML = '<tr><td colspan="5" class="text-muted">Nenhum material encontrado.</td></tr>';
    return;
  }

  lista.innerHTML = filtrados.map(m => `
    <tr>
      <td>${m.nome}</td>
      <td><span class="badge bg-secondary">${m.categoria || 'consumo'}</span></td>
      <td>
        ${m.quantidade}
        ${m.quantidade === 0 ? '<span class="badge bg-danger ms-1">Zerado</span>' : ''}
      </td>
      <td>${badgeValidade(m.validade)}</td>
      <td>
        <button class="btn btn-sm btn-outline-warning me-1 btn-baixar"
          onclick="baixarMaterial('${m.id}', ${m.quantidade})">Retirar</button>
        <button class="btn btn-sm btn-outline-danger btn-excluir"
          onclick="excluirMaterial('${m.id}')">Excluir</button>
      </td>
    </tr>
  `).join('');
}

function atualizarDashboard(materiais) {
  const totalEl = document.getElementById('total-itens');
  const zeradosEl = document.getElementById('total-zerados');
  const vencendoEl = document.getElementById('total-vencendo');

  if (totalEl) totalEl.textContent = materiais.length;
  if (zeradosEl) zeradosEl.textContent = materiais.filter(m => m.quantidade === 0).length;
  if (vencendoEl) vencendoEl.textContent = materiais.filter(m => {
    const dias = diasParaVencer(m.validade);
    return dias !== null && dias >= 0 && dias <= 30;
  }).length;
}

document.addEventListener('DOMContentLoaded', () => {
  carregarMateriais();

  document.getElementById('btn-cadastrar').addEventListener('click', cadastrarMaterial);

  const inputBusca = document.getElementById('input-busca');
  if (inputBusca) {
    inputBusca.addEventListener('input', carregarMateriais);
  }
});
