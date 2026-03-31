/////////////potrebne pouzit funkcie.js

class HQC {
    constructor(n = 21, gMatrix = []) {
        // verejne parametre
        this.n = n;
        this.G = gMatrix;
        this.w=1;
        this.w_e=1;
        this.w_r=1;
        this.h = generate_vect_h(this.n);
        this.roth=createRotationMatrix(this.h);

        //sukromne parametre BOB
        this.x = generateSparseVector(this.n, this.w);
        this.y = generateSparseVector(this.n, this.w);
        this.y_rotH=[];
        this.s = []; 
        this.rot_s=[];

        this.sr2=[];
        
        // parametre Alica
        this.r_1 = generateSparseVector(this.n, this.w_r);
        this.r_2 = generateSparseVector(this.n, this.w_r);
        this.e = generateSparseVector(this.n,this.w_e);
        this.r_2_rotH=[];
        this.u = [];
        this.rot_u=[];
        
        this.v = [];
        this.uy=[];
        this.v_minus_uy=[];
        
        // Správy
        this.m = [1, 0, 1];
        this.mG=[];

    }

    // Generovanie parametra h
    generateH() {
        this.h = generate_vect_h(this.n);
        this.roth=createRotationMatrix(this.h);
    }
    
    generateXY(){
         this.x = generateSparseVector(this.n, this.w);
        this.y = generateSparseVector(this.n, this.w);
    }
    generateE(){
        this.e=generateSparseVector(this.n,this.w_e);
    }
    generateR(){
        this.r_1 = generateSparseVector(this.n, this.w_r);
        this.r_2 = generateSparseVector(this.n, this.w_r);
    }


    // vyratanie parametru S (Bob)
    vypočitajS() {
      this.y_rotH=multiplyVectorMatrix(this.y, this.roth);
        this.s=addVectors(this.y_rotH, this.x);
    }
//sifrovanie (ALICA)
    encrypt(){
        this.rot_s=createRotationMatrix(this.s);
        this.r_2_rotH=multiplyVectorMatrix(this.r_2, this.roth);
        this.u=addVectors(this.r_2_rotH, this.r_1);
        this.mG=multiplyVectorMatrix(this.m, this.G);
        this.sr2=multiplyVectorMatrix(this.r_2, this.rot_s);
        this.v=addVectors(this.mG, addVectors(this.sr2, this.e));    
    }


    // Dešifrovanie (BOB)
    decrypt() {
       this.rot_u= createRotationMatrix(this.u);
       this.uy = multiplyVectorMatrix(this.y, this.rot_u);
       this.v_minus_uy=addVectors(this.v, this.uy);
    }
    update(){
        this.vypočitajS();
        this.encrypt();
        this.decrypt();
    }
}