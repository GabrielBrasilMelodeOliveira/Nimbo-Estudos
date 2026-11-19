/**
 * Gradiente vertical (cor -> transparente) para preencher a área sob uma linha.
 * Deve ser usado como filho do gráfico, e o `id` precisa ser referenciado no sx:
 * "& .MuiAreaElement-series-<idDaSerie>": { fill: "url('#<id>')" }
 */
export default function AreaGradient({ color, id }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}