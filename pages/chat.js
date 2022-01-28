import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { useState, useEffect } from "react";
import appConfig from "../config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NjgxMywiZXhwIjoxOTU4ODYyODEzfQ.9W2nlI_UyC73Pt2E8IsG57p3tt-1__fhG7-2ouV0QrU";
const SUPABASE_URL = "https://ounexqxxgcctkvcglodp.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  // Sua lógica vai aqui
  const [message, setMessage] = useState("");
  const [messageArr, setMessageArr] = useState([]);
  // ./Sua lógica vai aqui
  const handleDeleteMessage = (message) => {
    supabaseClient
    .from("messages")
    .update({deleted: true})
    .eq('id', message.id)
    .then((dados) => {
      setMessageArr([...messageArr]);
      console.log(messageArr)
    })
  };

  useEffect(() => {
    supabaseClient
      .from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then((dados) => {
        setMessageArr(dados.data);
      });
  }, [handleDeleteMessage]);

  const handleNewMessage = (newMessage) => {
    const message = {
      // id: messageArr.length + 1,
      de: "Danny-codes",
      texto: newMessage,
    };


    supabaseClient
      .from("messages")
      .insert([message])
      .then(({ data }) => {
        console.log('criando')
        setMessageArr([data[0], ...messageArr]);
      });
    setMessage("");
  };


  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9b2226",
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/12/bright-gaming-room-setup.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: "#a0001c",
          height: "100%",
          maxWidth: "75%",
          maxHeight: "90vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messageArr={messageArr} setMessageArr={setMessageArr} message={message} handleDeleteMessage={handleDeleteMessage}/>

          {/* <MessageList mensagens={[]} /> */}
          {/*} {messageArr.map((newMessage) => {
                       return (
                           <li key={newMessage.id}>
                               {newMessage.user}: {newMessage.text}
                           </li>
                       )
                    })}*/}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                const value = event.target.value;
                setMessage(value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "90%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              variant="tertiary"
              colorVariant="neutral"
              label="Send"
              styleSheet={{
                backgroundColor: "#370617",
                width: "10%",
                height: "80%",
                marginBottom: "8px",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                color: appConfig.theme.colors.neutrals[200],
              }}
              onClick={(event) => {
                handleNewMessage(message);
                event.preventDefault();
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
          styleSheet={{
            backgroundColor: "#370617",
            color: appConfig.theme.colors.neutrals[200],
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {


  const filtered = props.messageArr.filter(message => {
    return message.deleted === false
  })

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      
      {filtered.map((newMessage) => {
        return (
          <Text
            key={newMessage.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: "#370617",
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/${newMessage.de}.png`}
                />
                <Text tag="strong">{newMessage.de}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </div>
              <Button
                variant="tertiary"
                id="close-button"
                colorVariant="neutral"
                label={<FontAwesomeIcon icon={faTimesCircle} />}
                styleSheet={{
                  marginBottom: "8px",
                  border: "0",
                  resize: "none",
                  textAlign: "left",
                  borderRadius: "5px",
                  color: appConfig.theme.colors.neutrals[200],
                }}
                onClick={() => {
                  props.handleDeleteMessage(newMessage);
                }}
              />
            </Box>
            {newMessage.texto}
          </Text>
        );
      })}
    </Box>
  );
}
