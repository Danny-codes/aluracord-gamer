import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image} from '@skynexui/components'
import {useState} from 'react'
import { useRouter } from 'next/router'


function Titulo(props) {
  const value = props.children;
  const Tag = props.tag;
  return (
    <>
      <Tag>{value}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
        }
      `}</style>
    </>
  );
}

//function HomePage() {
//  return (
//    <div>
//      <GlobalStyle />
//      <Title tag="h1">Boas vindas Cara!</Title>
//      <h2>Discord - Alura Matrix</h2>
//    </div>
// );
//}

//export default HomePage;

export default function PaginaInicial() {
    //const username = 'Danny-codes';
    const [username, setUsername] = useState('')
    const roteamento = useRouter();
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#9b2226',
            backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/12/bright-gaming-room-setup.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (event) {
                event.preventDefault();
                roteamento.push(`/chat?username=${username}`)
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Bem vindo ao Servidor!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[500] }}>
                {appConfig.name}
              </Text>
  
             {/* <input 
                type="text" 
                value={username} 
                onChange={function handler(event){
                  //Pegando valor digitado
                  const valor = event.target.value
                  //trocar o valor da variavel atraves da função
                  setUsername(valor)
                }}
              />*/}
              <TextField
                value={username} 
                placeholder="GitHub username"
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: '#370617',
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                onChange={function handler(event){
                  const valor = event.target.value
                  setUsername(valor)
                }}
              /> 
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: '#ae2012',
                  mainColorLight: '#e63946',
                  mainColorStrong: '#9b2226',
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: '#370617',
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
         </Box>
        </>
      );
     }