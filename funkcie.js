
    function createRotationMatrix(h) {
        const n = h.length;
        const matrix = [];

        for (let i = 0; i < n; i++) {
            // Ak i=0, vrátime pôvodné h. Ak i>0, rotujeme.
            const rotatedRow = i === 0
                ? [...h]
                : [...h.slice(-i), ...h.slice(0, n - i)];

            matrix.push(rotatedRow);
        }
        return matrix;
    }
    function generate_vect_h(n){
          a = [];
        for (let i = 0; i < n; i++) {
            // Math.random() < 0.5 vráti true (1) alebo false (0)
            a.push(Math.random() < 0.5 ? 1 : 0);
        }
        return a;
    }
   
    function generateSparseVector(n, w) {
        if(w>n){
            w=n;
        }
        // 1. Vytvoríme pole samých núl
        let vector = new Array(n).fill(0);
        let count = 0;

        // 2. Náhodne umiestňujeme jednotky, kým nedosiahneme váhu w
        while (count < w) {
            let randomIndex = Math.floor(Math.random() * n);

            // Skontrolujeme, či na tejto pozícii už nie je jednotka
            if (vector[randomIndex] === 0) {
                vector[randomIndex] = 1;
                count++;
            }
        }
        return vector;
    }
    function multiplyVectorMatrix(vector, matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        // Inicializujeme výsledný vektor nulami
        let result = new Array(cols).fill(0);

        for (let i = 0; i < rows; i++) {
            // V binárnom poli sčitujeme riadok matice len vtedy, ak je vektore na i-tej pozícii 1
            if (vector[i] === 1) {
                for (let j = 0; j < cols; j++) {
                    // Operácia XOR (sčítanie v F2)
                    result[j] = result[j] ^ matrix[i][j];
                }
            }
        }
        return result;
    }
    function addVectors(a, b) {
        if (a.length !== b.length) {
            return [];
        }

        // Použijeme metódu map pre čistý a rýchly zápis
        return a.map((bit, index) => bit ^ b[index]);
    }
