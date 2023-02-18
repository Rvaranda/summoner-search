import styles from './css/Welcome.module.css';

function Welcome() {
  return (
    <div className={styles.welcomeContainer}>
      <h1>Bem vindo ao Summoner Search</h1>
      <h3>Digite o nome de um jogador do servidor brasileiro de League of Legends no campo acima</h3>
    </div>
  );
}

export default Welcome;