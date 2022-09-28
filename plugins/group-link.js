import { areJidsSameUser } from '@adiwajshing/baileys'
let handler = async (m, { conn, args }) => {
    let group = m.chat
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw 'Hanya bisa dibuka di grup'
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'groupMetadata is undefined :\\'
    if (!('participants' in groupMetadata)) throw 'participants is not defined :('
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw 'Aku 𝘙𝘢 𝘔𝘦𝘭𝘣𝘶 𝘎𝘳𝘰𝘶𝘱 𝘦 :('
    if (!me.admin) throw 'Aku 𝘎𝘶𝘥𝘶𝘬 𝘢𝘥𝘮𝘪𝘯 𝘤𝘰𝘬 T_T'
    m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i


export default handler