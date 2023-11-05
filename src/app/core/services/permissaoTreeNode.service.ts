import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissaoTreeNodeService {
  constructor(private router: Router) {}

  permissaoTreeNode(selected: any, permissao: any) {
    for (const i of Object.keys(selected)) {
      switch (selected[i].data) {
        // Permissão em Atendimentos---------------------------------
        case 'atendimentosCriar':
          console.log('existe atendimento');
          permissao[0].permission.create = true;
          break;
        case 'atendimentosVisualizar':
          permissao[0].permission.read = true;
          break;
        case 'atendimentosEditar':
          permissao[0].permission.update = true;
          break;
        case 'atendimentosStatus':
          permissao[0].permission.status = true;
          break;
        case 'atendimentosExcluir':
          permissao[0].permission.delete = true;
          break;

        // Permissão em Convenios---------------------------------
        case 'conveniosCriar':
          permissao[1].permission.create = true;
          break;
        case 'conveniosVisualizar':
          permissao[1].permission.read = true;
          break;
        case 'conveniosEditar':
          permissao[1].permission.update = true;
          break;
        case 'conveniosStatus':
          permissao[1].permission.status = true;
          break;
        case 'conveniosExcluir':
          permissao[1].permission.delete = true;
          break;

        // Permissão em Exames---------------------------------
        case 'examesCriar':
          permissao[2].permission.create = true;
          break;
        case 'examesVisualizar':
          permissao[2].permission.read = true;
          break;
        case 'examesEditar':
          permissao[2].permission.update = true;
          break;
        case 'examesStatus':
          permissao[2].permission.status = true;
          break;
        case 'examesExcluir':
          permissao[2].permission.delete = true;
          break;

        // Permissão em Pacientes---------------------------------
        case 'pacientesCriar':
          permissao[3].permission.create = true;
          break;
        case 'pacientesVisualizar':
          permissao[3].permission.read = true;
          break;
        case 'pacientesEditar':
          permissao[3].permission.update = true;
          break;
        case 'pacientesStatus':
          permissao[3].permission.status = true;
          break;
        case 'pacientesExcluir':
          permissao[3].permission.delete = true;
          break;

        // Permissão em Usuarios---------------------------------
        case 'usuariosCriar':
          permissao[4].permission.create = true;
          break;
        case 'usuariosVisualizar':
          permissao[4].permission.read = true;
          break;
        case 'usuariosEditar':
          permissao[4].permission.update = true;
          break;
        case 'usuariosStatus':
          permissao[4].permission.status = true;
          break;
        case 'usuariosExcluir':
          permissao[4].permission.delete = true;
          break;

        // Permissão em Relatório-------------------------------------
        case 'relatoriosVisualizar':
          permissao[5].permission.read = true;
          break;

        // Permissão em Empresas---------------------------------
        case 'empresasCriar':
          permissao[6].permission.create = true;
          break;
        case 'empresasVisualizar':
          permissao[6].permission.read = true;
          break;
        case 'empresasEditar':
          permissao[6].permission.update = true;
          break;
        case 'empresasStatus':
          permissao[6].permission.status = true;
          break;
        case 'empresasExcluir':
          permissao[6].permission.delete = true;
          break;

        // Permissão em Patrimonios---------------------------------
        case 'patrimoniosCriar':
          permissao[7].permission.create = true;
          break;
        case 'patrimoniosVisualizar':
          permissao[7].permission.read = true;
          break;
        case 'patrimoniosEditar':
          permissao[7].permission.update = true;
          break;
        case 'patrimoniosStatus':
          permissao[7].permission.status = true;
          break;
        case 'patrimoniosExcluir':
          permissao[7].permission.delete = true;
          break;
      }
    }
     
  }
  carregarPermissoesTreeNode(permissao: any, selectedpermissao: any) {
    // Início de Permissao de Atendimentos--------------------------------------------------------------
    if (permissao[0].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'atendimentosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'atendimentosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'atendimentosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'atendimentosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[0].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'atendimentosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'atendimentos') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Atendimentos -------------------------------------------------------------------

    // Início de Permissao de Convenios--------------------------------------------------------------
    if (permissao[1].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'conveniosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'conveniosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'conveniosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'conveniosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[1].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'conveniosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'convenios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Convenios -------------------------------------------------------------------

    // Início de Permissao de Exames--------------------------------------------------------------
    if (permissao[2].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'examesCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'examesVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'examesEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'examesStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[2].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'examesExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.exames !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'exames') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Exames -------------------------------------------------------------------

    // Início de Permissao de Pacientes--------------------------------------------------------------
    if (permissao[3].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pacientesCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pacientesVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pacientesEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pacientesStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[3].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pacientesExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'pacientes') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Pacientes -------------------------------------------------------------------

    // Início de Permissao de Usuarios--------------------------------------------------------------
    if (permissao[4].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[4].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuariosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[4].permission.create !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.status !== true &&
      permissao[4].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'usuarios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Usuarios -------------------------------------------------------------------

    // Início de Permissao de Relatórios------------------------------------------------
    if (permissao[5].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatoriosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[5].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'relatorios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Relatórios------------------------------------------------

    // Início de Permissao de Empresas--------------------------------------------------------------
    if (permissao[6].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[6].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresasExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'empresas') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Empresas -------------------------------------------------------------------

    // Início de Permissao de Patrimonio--------------------------------------------------------------
    if (permissao[7].permission.create !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'patrimoniosCriar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.read !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'patrimoniosVisualizar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.update !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'patrimoniosEditar') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.status !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'patrimoniosStatus') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (permissao[7].permission.delete !== true) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'patrimoniosExcluir') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    if (
      permissao[7].permission.create !== true &&
      permissao[7].permission.read !== true &&
      permissao[7].permission.update !== true &&
      permissao[7].permission.status !== true &&
      permissao[7].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'patrimonios') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
    // Fim permissao de Patrimonios -------------------------------------------------------------------

    // Verificar Node de Cadastro-------------------------------------------------------------------
    if (
      permissao[0].permission.create !== true &&
      permissao[0].permission.read !== true &&
      permissao[0].permission.update !== true &&
      permissao[0].permission.status !== true &&
      permissao[0].permission.delete !== true &&
      permissao[1].permission.create !== true &&
      permissao[1].permission.read !== true &&
      permissao[1].permission.update !== true &&
      permissao[1].permission.status !== true &&
      permissao[1].permission.delete !== true &&
      permissao[2].permission.create !== true &&
      permissao[2].permission.read !== true &&
      permissao[2].permission.update !== true &&
      permissao[2].permission.status !== true &&
      permissao[2].permission.delete !== true &&
      permissao[3].permission.create !== true &&
      permissao[3].permission.read !== true &&
      permissao[3].permission.update !== true &&
      permissao[3].permission.status !== true &&
      permissao[3].permission.delete !== true &&
      permissao[4].permission.read !== true &&
      permissao[4].permission.update !== true &&
      permissao[4].permission.delete !== true &&
      permissao[5].permission.create !== true &&
      permissao[5].permission.read !== true &&
      permissao[5].permission.update !== true &&
      permissao[5].permission.status !== true &&
      permissao[5].permission.delete !== true &&
      permissao[6].permission.create !== true &&
      permissao[6].permission.read !== true &&
      permissao[6].permission.update !== true &&
      permissao[6].permission.status !== true &&
      permissao[6].permission.delete !== true &&
      permissao[7].permission.create !== true &&
      permissao[7].permission.read !== true &&
      permissao[7].permission.update !== true &&
      permissao[7].permission.status !== true &&
      permissao[7].permission.delete !== true
    ) {
      selectedpermissao.forEach((item, index) => {
        if (item.data === 'cadastroNode') {
          selectedpermissao.splice(index, 1);
        }
      });
    }
  }
}
