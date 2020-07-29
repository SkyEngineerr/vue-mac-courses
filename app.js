new Vue({
  el: '#app',
  data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      healBtnCheck: true,
      specialAttackBtnCheck: true,
      shake: false,
      turns: []
  },
  methods: {
      startGame: function () {
          this.gameIsRunning = true;
          this.playerHealth = 100;
          this.monsterHealth = 100;
          this.turns = [];
      },
      attack: function () {
          var damage = this.calculateDamage(0, 10);
          this.shake= true;
          this.monsterHealth -= damage;
          this.turns.unshift({
              isPlayer: true,
              text: 'Player hits Monster for ' + damage
          });

          this.monsterAttacks();
          setTimeout(() => {
            this.shake = false;
          }, 200)

          if (this.checkWin()) {
            return;
        }
      },
      specialAttack: function () {
          var damage = this.calculateDamage(0, 101);
          this.shake= true;
          this.monsterHealth -= damage;
          this.turns.unshift({
              isSpecialAttack: true,
              text: 'Player hits Monster hard for ' + damage
          });
          this.monsterAttacks();
          this.specialAttackBtnCheck = false;
          setTimeout(() => {
            this.shake = false;
          }, 200)
          if (this.checkWin()) {
              return;
          }
          
      },
      heal: function () {
          var heal = this.calculateDamage(0, 30);
          
          this.playerHealth += heal;
         
           
          this.turns.unshift({
              isHeal: true,
              text: 'Player heals for 10'
          });
          this.monsterAttacks();
          this.healBtnCheck = false;
      },
      giveUp: function () {
          this.gameIsRunning = false;
          this.healBtnCheck= true;
          this.specialAttackBtnCheck=true;
      },
      monsterAttacks: function() {
          var damage = this.calculateDamage(0, 17);
          this.playerHealth -= damage;
          
          this.turns.unshift({
              isPlayer: false,
              text: 'Monster hits Player for ' + damage
          });

          this.checkWin();
      },
      calculateDamage: function(min, max) {
          return Math.max(Math.floor(Math.random() * max) + 1, min);
      },
      checkWin: function() {
          if (this.monsterHealth <= 0) {
              if (confirm('You won! New Game?')) {
                  this.startGame();
                  this.healBtnCheck= true;
                  this.specialAttackBtnCheck=true;
              } else {
                  this.gameIsRunning = false;
                  
              }
              return true;
          } else if (this.playerHealth <= 0) {
              if (confirm('You lost! New Game?')) {
                  this.startGame();
                  this.healBtnCheck= true;
                  this.specialAttackBtnCheck=true;
              } else {
                  this.gameIsRunning = false;
                 
              }
              return true;
          }
          return false;
      }
  }
});