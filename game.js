import readlineSync from 'readline-sync';

class Player {
  constructor() {
    this.hp = 100;
    this.attackPower = 10;  // 기본 공격력 추가
  }

  attack(monster) {
    const damage = Math.floor(Math.random() * this.attackPower) + 1;
    console.log(`플레이어가 몬스터에게 ${damage}의 데미지를 입혔습니다!`);
    monster.hp -= damage;
  }
}

class Monster {
  constructor(stage) {
    this.hp = stage * 10 + 40;
    this.monsterAttack = stage * 2 + 5;  // 스테이지에 따른 공격력 증가
  }

  attack(player) {
    const damage = Math.floor(Math.random() * this.monsterAttack) + 1;
    console.log(`몬스터가 플레이어에게 ${damage}의 데미지를 입혔습니다!`);
    player.hp -= damage;
  }
}

function displayStatus(stage, player, monster) {
  console.log(`\n스테이지: ${stage}`);
  console.log(`플레이어 HP: ${player.hp}`);
  console.log(`몬스터 HP: ${monster.hp}`);
  console.log('=====================\n');
}

function battle(stage, player, monster) {
  while (player.hp > 0 && monster.hp > 0) {
    displayStatus(stage, player, monster);

    const choice = readlineSync.question('1. 공격한다 2. 도망친다\n당신의 선택은? ');

    switch (choice) {
      case '1':
        player.attack(monster);
        break;
      case '2':
        console.log('플레이어가 도망쳤습니다. 스테이지를 종료합니다.');
        return;  // 스테이지 종료, 도망 시
      default:
        console.log('올바른 선택이 아닙니다.');
        continue;
    }

    if (monster.hp > 0) {
      monster.attack(player);
    }

    if (player.hp <= 0) {
      console.log('플레이어가 사망했습니다. 게임 오버.');
      break;
    } else if (monster.hp <= 0) {
      console.log('몬스터를 물리쳤습니다! 스테이지 클리어!');
      player.hp = Math.min(player.hp + 10, 100);  // 스테이지 클리어 시 체력 회복
      break;
    }
  }
}

function gameStart() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10 && player.hp > 0) {
    const monster = new Monster(stage);
    battle(stage, player, monster);

    if (player.hp > 0) {
      stage++;
    } else {
      break;
    }
  }

  if (player.hp > 0) {
    console.log('축하합니다! 모든 스테이지를 클리어했습니다!');
  }
}

export { gameStart };
