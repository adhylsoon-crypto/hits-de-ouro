"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function FavoritasPage() {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) { router.push("/login"); return; }
      supabase.from("favoritos").select("*").eq("user_id", data.session.user.id).order("created_at", { ascending: false }).then(({ data: favs }) => { setFavoritos(favs || []); setLoading(false); });
    });
  }, []);

  const remover = async (id: string) => {
    await supabase.from("favoritos").delete().eq("id", id);
    setFavoritos(prev => prev.filter(f => f.id !== id));
  };

  if (loading) return <div style={{textAlign:"center",paddingTop:"120px"}}><p style={{color:"#888"}}>Carregando...</p></div>;

  return (
    <div style={{maxWidth:"900px",margin:"0 auto",padding:"32px 20px"}}>
      <h1 style={{fontSize:"2rem",fontWeight:"bold",background:"linear-gradient(135deg,#FFD700,#b8860b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"8px"}}>Minhas Favoritas</h1>
      <p style={{color:"#666",marginBottom:"32px"}}>Suas musicas salvas em um so lugar</p>
      {favoritos.length === 0 && (
        <div style={{textAlign:"center",paddingTop:"80px"}}>
          <p style={{color:"#888",fontSize:"1.1rem",marginBottom:"24px"}}>Voce ainda nao favoritou nenhuma musica.</p>
          <a href="/" style={{padding:"12px 28px",borderRadius:"12px",background:"linear-gradient(135deg,#FFD700,#b8860b)",color:"black",textDecoration:"none",fontWeight:"bold"}}>Explorar musicas</a>
        </div>
      )}
      {favoritos.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {favoritos.map(fav => (
            <div key={fav.id} style={{display:"flex",alignItems:"center",gap:"16px",background:"#111",borderRadius:"14px",padding:"14px 16px",border:"1px solid #222"}}>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:0,fontWeight:"bold",color:"white"}}>{fav.song}</p>
                <p style={{margin:0,color:"#888",fontSize:"0.85rem"}}>{fav.artist}</p>
              </div>
              <div style={{display:"flex",gap:"8px",flexShrink:0}}>
                <a href={"/letra/" + encodeURIComponent(fav.artist) + "/" + encodeURIComponent(fav.song)} style={{padding:"8px 16px",borderRadius:"8px",background:"linear-gradient(135deg,#FFD700,#b8860b)",color:"black",textDecoration:"none",fontWeight:"bold",fontSize:"0.85rem"}}>Ver letra</a>
                <button onClick={() => remover(fav.id)} style={{padding:"8px 12px",borderRadius:"8px",background:"transparent",border:"1px solid #333",color:"#888",cursor:"pointer"}}>X</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
