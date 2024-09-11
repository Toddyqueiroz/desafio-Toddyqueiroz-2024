class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { MACACO: 3 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { GAZELA: 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { LEAO: 1 } }
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
    // Verificar se o tipo de animal é válido
    if (!this.animais[animal]) {
      return { erro: 'Animal inválido' };
    }

    // Verificar se a quantidade é válida
    if (isNaN(quantidade) || quantidade <= 0) {
      return { erro: 'Quantidade inválida' };
    }

    const animalInfo = this.animais[animal];
    const recintosViaveis = [];

    for (const recinto of this.recintos) {
      // Verificar se o recinto é adequado para o bioma
      const biomaValido = recinto.bioma.split(' e ').some(bioma => animalInfo.biomas.includes(bioma));
      if (!biomaValido) continue;

      // Verificar se o animal é carnívoro e se o recinto já possui outros animais
      if (animalInfo.carnivoro && Object.keys(recinto.animaisExistentes).length > 0) {
        continue; // Não pode colocar carnívoros com outras espécies
      }

      // Verificar se o recinto é adequado para hipopótamos
      if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
        continue; // Hipopótamos só toleram outras espécies em recintos com savana e rio
      }

      // Verificar se o recinto é adequado para macacos
      if (animal === 'MACACO' && Object.keys(recinto.animaisExistentes).length === 0) {
        continue; // Macacos não se sentem confortáveis sozinhos
      }

      // Calcular o espaço necessário
      let espacoNecessario = quantidade * animalInfo.tamanho;

      // Calcular o espaço ocupado por animais existentes
      const espacoOcupado = Object.entries(recinto.animaisExistentes).reduce((total, [tipo, qtd]) => total + (qtd * this.animais[tipo].tamanho), 0);

      // Calcular o espaço livre inicial antes de adicionar o espaço extra
      const espacoLivreInicial = recinto.tamanhoTotal - espacoOcupado;

      // Verificar se o recinto é viável antes de adicionar o espaço extra
      if (espacoNecessario <= espacoLivreInicial) {
        // Adicionar espaço extra para recintos com múltiplas espécies
        if (Object.keys(recinto.animaisExistentes).length > 0 && !recinto.animaisExistentes[animal]) {
          espacoNecessario += 1; // Espaço extra para múltiplas espécies
        }

        // Calcular o espaço livre após a adição do espaço extra
        const espacoLivre = espacoLivreInicial - espacoNecessario;

        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
      }
    }

    // Ordenar os recintos viáveis pelo número do recinto
    recintosViaveis.sort((a, b) => {
      const numeroA = parseInt(a.match(/Recinto (\d+)/)[1]);
      const numeroB = parseInt(b.match(/Recinto (\d+)/)[1]);
      return numeroA - numeroB; // Ordenar em ordem crescente
    });

    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: 'Não há recinto viável' };
    }
  }
}

export { RecintosZoo };
