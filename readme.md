# Lembretes App

O **Lembretes App** é um aplicativo simples e eficiente para gerenciar suas tarefas diárias. Ele permite que o usuário crie lembretes e associe alarmes a cada tarefa. Quando o lembrete chega ao horário programado, o alarme toca, e o usuário deve responder se concluiu ou não a tarefa. Se a tarefa for concluída, o alarme não tocará mais. Caso contrário, o alarme continuará a tocar a cada 2 minutos até que o usuário marque a tarefa como concluída.

## Funcionalidades

- **Criação de lembretes**: O usuário pode definir lembretes com título, descrição e hora de execução.
- **Alarmes**: O alarme toca no momento do lembrete e o usuário deve confirmar se a tarefa foi finalizada.
- **Repetição do alarme**: Caso o usuário não tenha finalizado a tarefa, o alarme tocará a cada 2 minutos até que a tarefa seja concluída.
- **Controle de tarefas**: O usuário pode indicar se a tarefa foi concluída ou não, o que interrompe ou continua os alarmes.

## Como Usar

1. **Criar um lembrete**:
    - Abra o app e clique na opção para adicionar um novo lembrete.
    - Insira um título e uma descrição para a tarefa.
    - Defina a hora em que o alarme deverá tocar.
    
2. **Receber o alarme**:
    - Quando o horário chegar, o alarme tocará no seu dispositivo.
    - Ao ouvir o alarme, você verá uma mensagem perguntando se a tarefa foi concluída.
    
3. **Responder ao alarme**:
    - Se você **finalizou** a tarefa, selecione "Sim" e o alarme será desativado.
    - Se você **não finalizou** a tarefa, selecione "Não" e o alarme tocará novamente em 2 minutos.
    
4. **Repetição do alarme**:
    - O alarme continuará tocando a cada 2 minutos até que você marque a tarefa como concluída.

## Tecnologias Usadas

- **Backend**: (Tecnologia de backend que você está usando, ex: Node.js, Django, etc.)
- **Frontend**: (Tecnologia de frontend, ex: React Native, Flutter, etc.)
- **Banco de Dados**: (Tecnologia de banco de dados que você está usando, ex: SQLite, Firebase, etc.)
- **Notificações**: (Tecnologia de notificações, ex: Push Notifications, Local Notifications, etc.)

## Como Instalar

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/lembretes-app.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd lembretes-app
    ```

3. Instale as dependências:
    ```bash
    npm install  # ou o comando correspondente à sua tecnologia
    ```

4. Inicie o app:
    ```bash
    npm start  # ou o comando correspondente à sua tecnologia
    ```

## Contribuições

Contribuições são bem-vindas! Para contribuir, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para sua nova feature ou correção (`git checkout -b minha-nova-feature`).
3. Faça suas alterações e commit (`git commit -am 'Adicionando uma nova feature'`).
4. Envie suas alterações (`git push origin minha-nova-feature`).
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido por**: Seu Nome ou Sua Equipe
