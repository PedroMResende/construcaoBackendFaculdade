const {calcularMediaAluno} = require('../src/calcularMediaAluno') ;

test("verifica se a função calcularMediaAluno está definida", () => {
  expect(calcularMediaAluno).toBeDefined();
});

test("teste a1 ou a2 indefinidos", () => { 
    expect(() => calcularMediaAluno(undefined, 7)).toThrow("Notas a1 ou a2 não informadas")
})

test("a1 ou a2 negativos", () => { 
    expect(() => calcularMediaAluno(-2,1)).toThrow("Notas a1 ou a2 não podem ser negativas")
})

test("teste cálculo base quando a3 não é informada", () => { 
    expect(calcularMediaAluno(3,5)).toBeCloseTo(4.2) 
})

test("valor de a3 negativo", () => { 
    expect(() => calcularMediaAluno(2,6,-3)).toThrow("Nota a3 não pode ser negativa")
})

test("combinação a1 com a3", () => { 
    expect(calcularMediaAluno(5,6,7)).toBeCloseTo(6.5) 
})

