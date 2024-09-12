class RecintosZoo { 
    constructor() {
      this.recintos = [
        { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: { MACACO: 3 } },
        { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: {} },
        { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: { GAZELA: 1 } },
        { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: {} },
        { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: { LEAO: 1 } }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      // Verificação de animal inválido
      if (!this.animais[animal]) {
        return { erro: 'Animal inválido' };
      }
  
      // Verificação de quantidade inválida
      if (isNaN(quantidade) || quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const animalInfo = this.animais[animal];
      const recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        // Verificar se o bioma do recinto é compatível com o bioma do animal
        const biomaValido = recinto.bioma.some(bioma => animalInfo.biomas.includes(bioma));
        if (!biomaValido) continue;
  
        // Verificar a presença de outros animais no recinto
        let podeAdicionar = true;
  
        // Verificar a presença de animais carnívoros e não carnívoros no recinto
        const animaisNoRecinto = Object.keys(recinto.animaisExistentes);
        const temCarnivorosNoRecinto = animaisNoRecinto.some(especie => this.animais[especie].carnivoro);
        const temNaoCarnivorosNoRecinto = animaisNoRecinto.some(especie => !this.animais[especie].carnivoro);
  
        if (animalInfo.carnivoro) {
          if (temNaoCarnivorosNoRecinto) {
            podeAdicionar = false; // Não pode adicionar carnívoros com animais não carnívoros
          }
          if (temCarnivorosNoRecinto && animaisNoRecinto.some(especie => this.animais[especie].carnivoro && especie !== animal)) {
            podeAdicionar = false; // Carnívoros só podem estar com a própria espécie
          }
        } else {
          if (temCarnivorosNoRecinto) {
            podeAdicionar = false; // Não pode adicionar animais não carnívoros com carnívoros
          }
        }
  
        if (!podeAdicionar) continue;
  
        // Verificar se os macacos não estão sozinhos
        if (animal === 'MACACO') {
          const temOutrosAnimais = Object.keys(recinto.animaisExistentes).length > 0;
          if (quantidade === 1 && !temOutrosAnimais) {
            continue; // Um macaco não pode ficar sozinho, mas se há mais de um macaco, o recinto vazio é aceito
          }
        }
  
        // Regra 1 hipopotamo: Verificar se o hipopótamo tolera outras espécies
        if (animal === 'HIPOPOTAMO') {
          const temOutrasEspecies = Object.keys(recinto.animaisExistentes).length > 0;
          const biomaCertoParaOutrasEspecies = recinto.bioma.includes('savana') && recinto.bioma.includes('rio');
          if (temOutrasEspecies && !biomaCertoParaOutrasEspecies) {
            continue; // Hipopótamos só toleram outras espécies em biomas "savana e rio"
          }
        }
        // Regra 2 hipopotamo: Verificar se o recinto já tem hipopótamos e impedir a adição de outros animais se o bioma não for adequado
        if (Object.keys(recinto.animaisExistentes).includes('HIPOPOTAMO')) {
            const biomaAdequado = recinto.bioma.includes('savana') && recinto.bioma.includes('rio');
            if (!biomaAdequado) {
            continue; // Não adicionar outros animais se o recinto já tiver hipopótamos e o bioma não for adequado
            }
        }
        // Calcular o espaço ocupado pelos animais existentes
        const espacoOcupado = Object.entries(recinto.animaisExistentes).reduce((total, [tipo, qtd]) => {
          return total + (qtd * this.animais[tipo].tamanho);
        }, 0);
  
        // Calcular o espaço necessário para o novo animal
        let espacoNecessario = quantidade * animalInfo.tamanho;
  
        // Regra 6: Adicionar espaço extra para múltiplas espécies
        if (Object.keys(recinto.animaisExistentes).length > 0) {
          // Verificar se há outras espécies além da que está sendo adicionada
          const temOutrasEspecies = Object.keys(recinto.animaisExistentes).some(especie => especie !== animal);
          if (temOutrasEspecies) {
            espacoNecessario += 1; // Espaço extra para múltiplas espécies
          }
        }
  
        console.log(`Recinto ${recinto.numero}: Espaco Necessario ${espacoNecessario}, Espaco Livre ${recinto.tamanhoTotal - espacoOcupado}`);
  
        // Verificar se há espaço suficiente no recinto
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
        if (espacoNecessario <= espacoLivre) {
          const espacoLivrePosInsercao = espacoLivre - espacoNecessario;
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivrePosInsercao} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      console.log('Recintos Viáveis:', recintosViaveis);
  
      if (recintosViaveis.length > 0) {
        return { recintosViaveis };
      } else {
        return { erro: 'Não há recinto viável' };
      }
    }
  }
  
  export { RecintosZoo };
  