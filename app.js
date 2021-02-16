new Vue({
    el: '#app',
    data: {
      running: false,
      welcome: true,
      jogador: 'Jogador',
      monstro: 'Monstro',
      logged: false,
      playerLife: 100,
      monsterLife: 100,
      logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        entrarGame(){
            this.logged = true
            this.welcome = false
        },
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
      },
      desistir() {
            this.running = false
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
      },
      reiniciar() {
          this.welcome = true
          this.logged = false
          this.running = false
          this.jogador = 'Jogador'
          this.monstro = 'Monstro'
          this.logs = []
          this.playerLife = 100
          this.monsterLife = 100
      },
      attack(especial) {
        this.hurt('monsterLife', 4, 8, especial, 'Jogador', 'Monstro', 'player')
        if(this.monsterLife > 0) {
            this.hurt('playerLife', 5, 10, false, 'Monstro', 'Jogador', 'monster')
        }
      },
      hurt(atr, min, max, especial, source, target, cls) {
          const plus = especial ? 5 : 0
          const hurt = this.getRandom(min + plus, max + plus)
          this[atr] = Math.max(this[atr] - hurt, 0)
          this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
      },
      healAndHurt() {
          this.heal(5, 10)
          this.hurt('playerLife', 4, 14, false, 'Monstro', 'Jogador', 'monster')
      },
      heal(min, max){
          const heal = this.getRandom(min, max)
          this.playerLife = Math.min(this.playerLife + heal, 100)
          this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
      },
      getRandom(min, max) {
          const value = Math.random() * (max - min) + min
          return Math.round(value)
      },
      registerLog(text, cls) {
          this.logs.unshift({ text, cls })
      },
      nomeJogador(event) {
        this.jogador = event.target.value
      },
      nomeMonstro(event) {
        this.monstro = event.target.value
      }
    },
    watch: {
        hasResult(value) {
          if (value) this.running = false
        }
    }
})