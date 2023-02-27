package stosRPN;



public class RPN extends Stos{
    private String[] ciag;
    private Stos stos;


    public RPN(String seq){
        ciag = seq.split("\\s+");
    }


    public int solve(){
        stos = new Stos();

        for (String s : ciag)
            switch (s) {
                case "+" -> {
                    int jeden = stos.pop();
                    int dwa = stos.pop();
                    stos.push(jeden+dwa);

                }
                case "-" -> {
                    int jeden = stos.pop();
                    int dwa = stos.pop();
                    stos.push(dwa-jeden);

                }
                case "*" -> {
                    int jeden = stos.pop();
                    int dwa = stos.pop();
                    stos.push(jeden*dwa);
                }
                case "/" -> {
                    int jeden = stos.pop();
                    int dwa = stos.pop();
                    stos.push(dwa/jeden);

                }

                default -> stos.push(Integer.parseInt(s));
            }
        return stos.peek();
    }



}
