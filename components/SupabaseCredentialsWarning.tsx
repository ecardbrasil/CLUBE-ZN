import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm my-4">
        <code>{children}</code>
    </pre>
);

const SupabaseCredentialsWarning: React.FC = () => {
  return (
    <div className="bg-background text-text-primary min-h-screen font-sans flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-surface p-8 rounded-2xl border border-red-200 shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">❗️ Ação Necessária: Configurar Supabase</h1>
        <p className="text-text-secondary mb-6">
          A aplicação não pode se conectar ao backend porque as credenciais do Supabase não foram configuradas. Por favor, siga os passos abaixo para resolver o problema.
        </p>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">1. Obtenha suas credenciais</h2>
            <p className="text-text-secondary">
              Acesse seu projeto no <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Supabase</a>, vá para <span className="font-semibold">Configurações do Projeto &gt; API</span> e copie a <span className="font-semibold">URL do Projeto</span> e a chave <span className="font-semibold">anon pública</span>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">2. Configure o Frontend</h2>
            <p className="text-text-secondary">
              Abra o arquivo <code className="bg-gray-200 text-sm p-1 rounded">lib/supabaseClient.ts</code> e substitua os valores de <code className="bg-gray-200 text-sm p-1 rounded">supabaseUrl</code> e <code className="bg-gray-200 text-sm p-1 rounded">supabaseKey</code>:
            </p>
            <CodeBlock>
{`// Em: lib/supabaseClient.ts

// TODO: Substitua pelos dados do seu projeto Supabase.
const supabaseUrl = 'SUA_URL_DO_PROJETO_AQUI';
const supabaseKey = 'SUA_CHAVE_ANON_PUBLICA_AQUI';`}
            </CodeBlock>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">3. Configure o Backend</h2>
             <p className="text-text-secondary">
              Na pasta <code className="bg-gray-200 text-sm p-1 rounded">server/</code>, crie um arquivo chamado <code className="bg-gray-200 text-sm p-1 rounded">.env</code> e adicione suas credenciais:
            </p>
            <CodeBlock>
{`# Em: server/.env

SUPABASE_URL=SUA_URL_DO_PROJETO_AQUI
SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA_AQUI`}
            </CodeBlock>
             <p className="text-text-secondary mt-4">
              Após configurar os arquivos, reinicie o servidor de backend (se estiver rodando) e atualize esta página.
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-text-secondary">
            <p>Depois de atualizar os arquivos com suas credenciais, a aplicação funcionará corretamente.</p>
        </div>
      </div>
    </div>
  );
};

export default SupabaseCredentialsWarning;
