export class Ranking {
    public meGusta: number = 0;
    public noMeGusta: number = 0;
    public meDaIgual: number = 0;

    public incrementarMeGusta() {
        this.meGusta++;
    }

    public incrementarNoMeGusta() {
        this.noMeGusta++;
    }

    public incrementarMeDaIgual() {
        this.meDaIgual++;
    }

}