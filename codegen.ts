import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:5050/query', // GoサーバーのGraphQLエンドポイント
  documents: ['src/**/*.graphql', 'src/**/*.(query|mutation).{ts,tsx}'], // GraphQLクエリを含むファイル
  generates: {
    './src/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      plugins: [
        'typescript', 
        'typescript-operations', 
        'typescript-react-apollo'
      ],
      config: {
        uniqueTypes: true,
        pureMagicComment: true,
        noExport: true, // 重複エクスポートを防止
      onlyOperationTypes: true // オペレーション型のみ生成
      }
    }
  },
  ignoreNoDocuments: true,
}

export default config