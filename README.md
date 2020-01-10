<<<<<<< HEAD
## Entendendo a arquitetura service-mixin

Para entender a arquitetura service-mixin, é necessário ter em mente como funciona o padrão repository. 
      O padrão repository nada mais é que abstrações de objetos ou entidades de um determinado domínio que acessam uma API ou banco de dados. Ele é fortemente vinculado ao domínio da aplicação e este é um reflexo direto das regras de negócio, pois ele abstrai armazenamento e consulta de um ou mais entidades do domínio.
      Em nossa arquitetura, pelo fato de ser um projeto FRONT-END, não será necessário o uso de entidades, apenas os repositorys que serão nomeados como services.
      
### Estrutura Global

A estrutura global do service-mixin baseia-se em entender alguns diretórios como :
- http-utils
- services
- store
- mixins
![1.PNG](:storage\8a9121e6-2782-42e7-95f9-30e4a387a4e6\4128206d.PNG)

#### Diretório http-utils

No diretório http-service, existe um arquivo chamado Http.js, onde nele é feita toda a configuração do axios (lib de requisições HTTP), como por exemplo : a baseURL da API, os interceptors, o token caso seja necessário, entre outras configurações.

#### Diretório services
No diretório services, existem dois arquivos, Base.js e ResponseService.js.

![2.PNG](:storage\8a9121e6-2782-42e7-95f9-30e4a387a4e6\71094919.PNG)

No arquivo Base.js, é onde é feita toda a abstração dos métodos que serão mais utilizados na aplicação, como por exemplo, o CRUD.
```js
// services/Base.js
import { http } from '@/http-utils/Http'
import { ResponseService } from './ResponseService'
export default class Base {
  constructor (api) {
    this.api = api
    this.http = http
    this.ResponseService = ResponseService
  }
  list = async () => {
    try {
      const response = await this.http.get(this.api)
      return response
    } catch (error) {
      throw this.ResponseService(error, 'list')
    }
  }
  show = async ($id) => {
    try {
      const response = await this.http.get(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw this.ResponseService(error, 'get', 'item')
    }
  }

  create = async ($data) => {
    try {
      const response = await this.http.post(this.api, $data)
      return response.data
    } catch (error) {
      throw this.ResponseService(error, 'create')
    }
  }

  update = async ($data) => {
    try {
      const response = await this.http.put(`${this.api}/${$data.id}`, $data)
      return response.data
    } catch (error) {
      throw this.ResponseService(error, 'update')
    }
  }

  remove = async ($id) => {
    try {
      const response = await this.http.delete(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw this.ResponseService(error, 'remove')
    }
  }
}

```
Aqui temos as importações do Http e do Response Service( que veremos mais pra frente), onde o http disponibiliza os métodos básicos para acesso as requisições HTTP (get, post, put, delete, etc.) e o ResponseService controla a resposta da requisição, de acordo como status retornado pela mesma.

```js
// services/Base.js
import { http } from '@/http-utils/Http'
import { ResponseService } from './ResponseService'
``` 
No construtor do Base, é passado como patrâmetro o endereço do endpoint da API, sendo assim, é possível criar um atributo atribuindo como valor o parâmetro, permitindo ser disponibilizado para qualquer serviço que herdar a classe Base e para os métodos criados na classe. É utilizada a mesma ideia de disponibilização de atributos com as instâncias de http e ResponseService
```js
// services/Base.js
  constructor (api) {
    this.api = api
    this.http = http
    this.ResponseService = ResponseService
  }
```
No método list por exemplo, que tem como objetivo listar todas as informações de um determinado domínio, é utilizado o atributo this.api como parâmetro da requisição get, caso seja sucesso a resposta será retornada, caso ocorra algum problema, o atributo erro é passado como parâmetro para o ReponseService, e a string 'list' como segundo parâmetro, que serve para identificar qual a finalidade do método executado.
```js
// services/Base.js
 list = async () => {
    try {
      const response = await this.http.get(this.api)
      return response
    } catch (error) {
      throw this.ResponseService(error, 'list')
    }
  }
```
#### Diretório store
Possui um arquivo index.js, que é responsavel pela injeção do vuex no vue, além de permitir a configuração de quais modulos serão utilizados na aplicação.
```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import Post from '@/pages/post/store'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Post
    }
  })

  return Store
}
```
#### Diretório mixins
No diretório mixins, existem dois arquivos chamados: base.mixin.js e notify-message.mixin.js

![435cbd1e.png](:storage\8a9121e6-2782-42e7-95f9-30e4a387a4e6\435cbd1e.png)

Mas o que são mixins? 
Mixins são uma forma flexível de distribuir funcionalidade reutilizável em diversos componentes Vue. Um objeto mixin pode conter quaisquer opções de componente. Quando um componente utiliza um mixin, todas as opções deste serão misturadas (em inglês, mixed in) com as opções do próprio componente. Saiba mais em : ([Mixins — Vue.js](https://br.vuejs.org/v2/guide/mixins.html))

Sabendo os conceitos básicos do mixins, será entendido com mais faciliddade a função de cada arquivo.O arquivo base.mixin tem uma funcionalidade parecida com a Base em services, ela é responsável por abstrair métodos que são comuns na aplicação.
##### base.mixin.js
```js
// mixins/base.mixin.js
async list(params) {
/*loadingShow */
  try {
    await this.$store.dispatch(params.urlDispatch)
    if (params.callback) {
      params.callback()
    }
  } catch (errors) {
    this.setNotifyDanger(errors)
  } finally { /*loadingHide */ }
},
```

É notável uma semelhança com o Base em services, mas neste caso aqui, o método list recebe um objeto como paramêtro e este objeto possui várias propriedades responsáveis em determinar como o método irá se comportar. A propriedade mais importante é a urlDispatch, ela é passada no this.$store.dispatch para acionar uma action específica.
Outra propriedade de suma importância é o callback, através dela é executado um método caso a action ( que no decorrer da explicação, será mostrado que a action utiliza o serviço do módulo.) ocorra com sucesso. Caso ocora um erro, o parâmetro errors é passado para o método de notificações do mixin, e então apresentado na tela um ou mais erros de acordo com objeto ou array retornado pela requisição.
```js
// mixins/base.mixin.js
this.setNotifySuccess(params.messages)
``` 
No método createOrUpdate, é utilizado a terceira propriedade possível, a messages. Através das messages, pode-se chamar outro método do mixin de notificações, o setNotifySuccess, que é utilizado para mensagens de sucesso. 

No entanto, é possível criar quantas propriedades for necessário, a arquitetura não se restringe as três apresentadas, uma propriedade que, até está comentada como uma idéia, é o próprio loading no momento de carregamento das requisições.
##### notify-message.mixin,js
O segundo arquivo do diretório mixins é o notify-messages.mixin.js, responsável por disponibilizar métodos de apresentação de mensages.
```js
// mixins/notify-message.mixin.js
export default {
  methods: {
    setNotifyDanger(message) {
      const uniqueMessage = message.message || message
      if (Array.isArray(message)) {
        this.setMultipleNotifyDanger(message)
      } else {
        this.setUniqueNotifyDanger(uniqueMessage)
      }
    },
    setUniqueNotifyDanger(message) {
      alert("ERRO: " + message)
    },
    setMultipleNotifyDanger(messages) {
      messages.forEach(message => {
        this.setUniqueNotifyDanger(message.errorMessage)
      })
    },
    setNotifySuccess(message) {
      alert("SUCCESS: " + message)
    }
  }

}
```
Novamente, este mixin não se limita apenas as mensages de sucesso ou erro, vai de cada desenvolvedor implementar um método de acordo com a sua necessidade.

### Estrutura de um módulo

A estrutura de um módulo específic9 do service-mixin baseia-se em entender alguns diretórios como :
- services
- store
![54cbca77.png](:storage\8a9121e6-2782-42e7-95f9-30e4a387a4e6\54cbca77.png)

Diferente do que normalmente é utilizado, aqui é utilizado tudo relacionado ao módulo em seu próprio diretório (service, store, view), para que assim, seja mais fácil de encontrar os arquivos do mesmo.

#### Diretório services
No diretório services é onde é criado o service específico de um módulo.
##### PostService.mixin,js
O PostService é um exemplo de criação de um service específico de um módulo.
```js
// pages/post/services/PostService.js
import Base from '@/services/Base'
class PostService extends Base {
  constructor() {
    super('/posts')
  }
}
export default new PostService()
``` 
O base é importado, e através do extends,  é herdado para que todos os métodos fiquem disponíveis para o PostService.Com o super, passamos para o construtor do Base o endpoint da API, que no caso é /posts, e exportamos a classe já instanciada.

=======
# service-mixin-vue
```
npm run serve
```
>>>>>>> 14fb835e19e6764372875222341ae64da2913c4a
