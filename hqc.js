class HQC {
    constructor(n = 21, gMatrix = []) {
        this.n = n;
        this.G = gMatrix;
        
        // Kľúče a premenné
        this.h = [];
        this.x = [];
        this.y = [];
        this.s = []; // Verejný kľúč
        
        // Šifrovacie medzikroky
        this.r1 = [];
        this.r2 = [];
        this.e = [];
        this.u = [];
        this.v = [];
        
        // Správy
        this.m = [1, 0, 1];
        this.decryptedM = [];
    }

    // Generovanie kľúčov (Alice)
    generateKeys(w) {
        this.h = generate_vect_h(this.n);
        this.x = generateSparseVector(this.n, w);
        this.y = generateSparseVector(this.n, w);
        
        const roth = createRotationMatrix(this.h);
        const pomocny_s = multiplyVectorMatrix(this.y, roth);
        this.s = addVectors(pomocny_s, this.x);
    }

    // Šifrovanie (Bob)
    encrypt(message, w_r, w_e) {
        this.m = [...message];
        this.r1 = generateSparseVector(this.n, w_r);
        this.r2 = generateSparseVector(this.n, w_r);
        this.e = generateSparseVector(this.n, w_e);

        const roth = createRotationMatrix(this.h);
        const rot_s = createRotationMatrix(this.s);

        // u = r1 + r2 * H
        const pomocny_u = multiplyVectorMatrix(this.r2, roth);
        this.u = addVectors(pomocny_u, this.r1);

        // v = m*G + r2 * S + e
        const mG = multiplyVectorMatrix(this.m, this.G);
        const sr2 = multiplyVectorMatrix(this.r2, rot_s);
        this.v = addVectors(mG, addVectors(sr2, this.e));
    }

    // Dešifrovanie (Alice)
    decrypt() {
        const rot_u = createRotationMatrix(this.u);
        const uy = multiplyVectorMatrix(this.y, rot_u);
        const final = addVectors(this.v, uy);

        // Decoding (opakovací kód podľa dĺžky bloku v G)
        let result = [];
        let blockSize = this.n / this.G.length; // v tvojom prípade 21/3 = 7
        
        for (let i = 0; i < this.G.length; i++) {
            let count0 = 0;
            for (let j = 0; j < blockSize; j++) {
                if (final[i * blockSize + j] === 0) count0++;
            }
            result[i] = (count0 > blockSize / 2) ? 0 : 1;
        }
        this.decryptedM = result;
        return result;
    }

    isReliable(w, we, wr) {
        return (w + we + wr <= 3);
    }
}