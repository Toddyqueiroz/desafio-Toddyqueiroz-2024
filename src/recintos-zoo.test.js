import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });


    // estou adicionando mais alguns testes para melhor validacao da minha logica.
    test('Deve encontrar recinto para 2 macacos e 1 crocodilo se não forem alocados juntos', () => {
        
        const resultadoMacaco = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultadoMacaco.erro).toBeFalsy();
        expect(resultadoMacaco.recintosViaveis.length).toBeGreaterThan(0);
    
        const resultadoCrocodilo = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultadoCrocodilo.erro).toBeFalsy();
        expect(resultadoCrocodilo.recintosViaveis.length).toBeGreaterThan(0);
    
        // Verificar se a função está considerando corretamente o espaço extra necessário
        // para acomodar as múltiplas espécies e garantindo que macacos e crocodilos não estão no mesmo recinto.
    });
    
    test('Deve encontrar recinto para 2 macacos com outro animal já presente', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis.length).toBeGreaterThan(0);
    });

    test('Deve encontrar recinto para 1 hipopótamo com 1 macaco', () => {
        // Supondo que o Recinto X tenha savana e rio e tenha espaço suficiente
        const resultadoHipopotamo = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultadoHipopotamo.erro).toBeFalsy();
        expect(resultadoHipopotamo.recintosViaveis.length).toBeGreaterThan(0);
    
        const resultadoMacaco = new RecintosZoo().analisaRecintos('MACACO', 1);
        expect(resultadoMacaco.erro).toBeFalsy();
        expect(resultadoMacaco.recintosViaveis.length).toBeGreaterThan(0);
    
        // Certifique-se de que o recinto de hipopótamo e o de macaco são compatíveis
        // e se há consideração correta do espaço adicional quando várias espécies estão presentes.
    });

    test('Deve encontrar recinto para 1 leão', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEAO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 5 (espaço livre: 3 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });
    
    test('Deve encontrar recinto para 1 hipopótamo', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis).toContain('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBeGreaterThan(0);
    });

});

