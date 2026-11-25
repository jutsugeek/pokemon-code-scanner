/**
 * Google Apps Script - Scanner de Códigos Pokémon TCG Live
 * 
 * Como usar:
 * 1. Crie uma nova planilha no Google Sheets
 * 2. Na primeira linha, coloque os cabeçalhos: Código | Coleção | Data/Hora | Status
 * 3. Vá em Extensões > Apps Script
 * 4. Cole este código
 * 5. Salve e clique em Implantar > Nova implantação
 * 6. Tipo: Aplicativo da Web
 * 7. Executar como: Eu
 * 8. Quem tem acesso: Qualquer pessoa
 * 9. Copie a URL do Web App e cole no scanner
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const codigo = (data.codigo || '').toString().trim().toUpperCase();
    const colecao = (data.colecao || '').toString().trim();
    const timestamp = data.timestamp || new Date().toISOString();

    if (!codigo) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Código vazio'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Format timestamp for Brazil
    const date = new Date(timestamp);
    const formattedDate = Utilities.formatDate(date, "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    sheet.appendRow([codigo, colecao, formattedDate, 'Disponível']);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Código salvo'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: GET for testing
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Apps Script do Scanner TCG Live está funcionando'
  })).setMimeType(ContentService.MimeType.JSON);
}
