import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { artist, song, enviado_por } = await request.json();

    await resend.emails.send({
      from: 'Hits de Ouro <onboarding@resend.dev>',
      to: 'adhylsoon@gmail.com',
      subject: '🎵 Nova letra enviada no Hits de Ouro!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 32px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #FFD700; font-size: 1.8rem; margin: 0;">🎵 Hits de Ouro</h1>
            <p style="color: #888; margin-top: 8px;">Nova letra aguardando aprovação</p>
          </div>
          <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; border: 1px solid #b8860b33;">
            <p style="color: #FFD700; font-size: 1.1rem; font-weight: bold; margin: 0 0 16px;">📋 Detalhes da submissão:</p>
            <p style="color: #ccc; margin: 8px 0;"><strong style="color: white;">🎤 Artista:</strong> ${artist}</p>
            <p style="color: #ccc; margin: 8px 0;"><strong style="color: white;">🎵 Música:</strong> ${song}</p>
            <p style="color: #ccc; margin: 8px 0;"><strong style="color: white;">👤 Enviado por:</strong> ${enviado_por}</p>
          </div>
          <div style="text-align: center; margin-top: 24px;">
            <a href="https://www.hitsdeouroletras.com.br/admin" 
               style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg,#FFD700,#b8860b); color: black; text-decoration: none; border-radius: 10px; font-weight: bold;">
              ✅ Ir para o Painel Admin
            </a>
          </div>
          <p style="color: #555; font-size: 0.8rem; text-align: center; margin-top: 24px;">
            Hits de Ouro • hitsdeouroletras.com.br
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}