<?  

    class Stock {

        static $company = array("I:DJI" => "Dow Jones Industrial Average","NWSA" => "NEWSCORP","GOOG" => "GOOGLE","YHOO" => "YAHOO","MSFT" => "MSFT","AAPL" => "APPLE", "MMM" => "3M CO.","AA" => "ALCOA INC.","AXP" => "AMERICAN EXPRESS CO.","T" => "AT&T INC.","BAC" => "BANK OF AMERICA CORP.","BA" => "BOEING CO.","CAT" => "CATERPILLAR INC.","CVX" => "CHEVRON CORP.","CSCO" => "CISCO SYSTEMS, INC.","KO" => "COCA COLA CO.","DD" => "E.I. DUPONT DE NEMOURS & CO.","XOM" => "EXXON MOBIL CORP.","GE" => "GENERAL ELECTRIC CO.","HPQ" => "HEWLETT-PACKARD CO.","HD" => "THE HOME DEPOT INC.","INTC" => "INTEL CORP.","IBM" => "INTERNATIONAL BUSINESS MACHINES CORP.","JNJ" => "JOHNSON & JOHNSON","JPM" => "JPMORGAN CHASE & CO.","KFT" => "KRAFT FOODS INC.","MCD" => "MCDONALD'S CORP.","MRK" => "MERCK & CO. INC.","PFE" => "PFIZER INC.","PG" => "THE PROCTER & GAMBLE CO.","TRV" => "TRAVELERS COMPANIES, INC.","UTX" => "UNITED TECHNOLOGIES CORP.","VZ" => "VERIZON COMMUNICATIONS INC.","WMT" => "WAL-MART STORES INC.","DIS" => "WALT DISNEY CO.");
                        
        public $data;

        public function __construct($sym) {
            $this->data = array(
                "@attributes" => array("source" => $sym),
                "ticker" => $sym,
                "description" => $this->getName($sym),
                "current" => $this->randomize(50, 120, false),
                "bats_current" => $this->randomize(50, 120, false),
                "netChange" => $this->randomize(0, 10, true),
                "bats_netChange" => $this->randomize(0, 10, true),
                "percentChange" => $this->randomize(0, 10, true)."%",
                "bats_percentChange" => $this->randomize(0, 10, true)."%",
                "open" => $this->randomize(90, 120, false),
                "close" => $this->randomize(90, 120, false),
                "high" => $this->randomize(90, 120, false),
                "low" => $this->randomize(40, 80, false),
                "oneYearHigh" => "110.01",
                "oneYearLow" => "86.68",
                "volume" => rand(1, 15).",".rand(100, 999).",".rand(100, 999),
                "dateTime" => "12\/30\/2011 04:00 PM EST",
                "bats_dateTime" => "12\/30\/2011 03:59 PM EST",
                "exchange" => "NYSE");
        }

        public function randomize($min, $max, $appendSign) {
            $sign = array(1, -1);
            $rand = (rand($min, $max)+(0.01*rand($min, $max)));
            if ($appendSign) {
                $rand = $rand*($sign[rand(0,1)]);
                if ($rand > 0) {
                    $rand = "+".$rand;
                }
            }
            return (string)$rand;
        }

        public function getName($sym) {
            return Stock::$company[$sym];
        }

        static function something(){
            echo 'INTERESTING';
        }




    }

    function generate() {
        $all = array();
        $symbols = split('\,', $_GET["s"]);
        $callback = $_GET["callback"];
        if (count($symbols) < 2) {
            $s = new Stock($symbols[0]);
            return $callback."(".json_encode(array("quote" => $s->data)).");";
        }
        for ($i=0; $i<count($symbols); $i++) {
            $s = new Stock($symbols[$i]);
            array_push($all, $s->data);
        }
        return $callback."(".json_encode(array("quote" => $all)).");";
    }
    
    echo generate();  
    
?>


