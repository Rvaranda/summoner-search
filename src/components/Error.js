const h1Style = {
    textAlign: 'center',
    margin: '20px'
};

const pStyle = {
    margin: '10px 20px',
    opacity: 0.8,
    textAlign: 'center',
    fontSize: '1.2rem'
};

const errorMessages = [(
    <>
    <h1 style={h1Style}>Invocador não encontrado</h1>
    <p style={pStyle}>Verifique se o nome do invocador está correto</p>
    </>
), (
    <h1 style={h1Style}>Erro inesperado. Tente novamente mais tarde</h1>
)];

function Error({ err }) {
    return (
        <>
        {err.response.status === 404 ? errorMessages[0] : errorMessages[1]}
        </>
    );
}

export default Error;