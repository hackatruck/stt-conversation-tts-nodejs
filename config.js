var config = {};

config.stt = {};
config.stt.username = "";
config.stt.password = ""
config.stt.apikey = "" // not used for now - set username and password
config.stt.keywords=[];
config.stt.smart_formatting=true;
config.stt.profanity_filter=true;
config.stt.inactivity_timeout=-1;
config.stt.interim_results=true;
// Some valid voices to choose
// ar-AR_BroadbandModel
// en-UK_BroadbandModel
// en-UK_NarrowbandModel
// en-US_BroadbandModel (the default)
// en-US_NarrowbandModel
// es-ES_BroadbandModel
// es-ES_NarrowbandModel
// fr-FR_BroadbandModel
// ja-JP_BroadbandModel
// ja-JP_NarrowbandModel
// pt-BR_BroadbandModel
// pt-BR_NarrowbandModel
// zh-CN_BroadbandModel
// zh-CN_NarrowbandModel
config.stt.model="pt-BR_BroadbandModel";

config.conversation={};
config.conversation.username=""
config.conversation.password=""
config.conversation.workspace_id=""

config.tts={};
config.tts.username=""
config.tts.password=""
config.tts.apikey="" // not used for now - set username and password

// Some valid voices to choose
// de-DE_BirgitVoice
// de-DE_DieterVoice
// en-GB_KateVoice
// en-US_AllisonVoice
// en-US_LisaVoice
// en-US_MichaelVoice
// es-ES_LauraVoice
// es-ES_EnriqueVoice
// es-LA_SofiaVoice
// es-US_SofiaVoice
// fr-FR_ReneeVoice
// it-IT_FrancescaVoice
// ja-JP_EmiVoice
// pt-BR_IsabelaVoice

config.tts.voice="pt-BR_IsabelaVoice";

module.exports = config;
