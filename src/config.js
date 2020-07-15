const Config = {
  Log: {
    verbose: false
  },
  App: {
    id: null,
    hash: null,
    version: '2.0.1',
  },
  Modes: {
    // allow_tmpfs: false,
    // animations: true,
    // chrome_packed: false,
    // debug: false,
    // force_desktop: false,
    // force_mobile: false,
    // http: false,
    // ios_standalone: undefined,
    // memory_only: false,
    // nacl: true,
    // packed: false,
    // push_api: true,
    ssl: false,
    test: true,
    websockets: true,
    // webcrypto: true
  }
}

Config.Schema = Config.Schema || {}
Config.Schema.MTProto = null;
Config.Schema.MTProto = {
  'constructors': [
    {
      'id': '481674261',
      'predicate': 'vector',
      'params': [

      ],
      'type': 'Vector t'
    },
    {
      'id': '85337187',
      'predicate': 'resPQ',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'pq',
          'type': 'bytes'
        },
        {
          'name': 'server_public_key_fingerprints',
          'type': 'Vector<long>'
        }
      ],
      'type': 'ResPQ'
    },
    {
      'id': '-2083955988',
      'predicate': 'p_q_inner_data',
      'params': [
        {
          'name': 'pq',
          'type': 'bytes'
        },
        {
          'name': 'p',
          'type': 'bytes'
        },
        {
          'name': 'q',
          'type': 'bytes'
        },
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'new_nonce',
          'type': 'int256'
        }
      ],
      'type': 'P_Q_inner_data'
    },
    {
      'id': '2043348061',
      'predicate': 'server_DH_params_fail',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'new_nonce_hash',
          'type': 'int128'
        }
      ],
      'type': 'Server_DH_Params'
    },
    {
      'id': '-790100132',
      'predicate': 'server_DH_params_ok',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'encrypted_answer',
          'type': 'bytes'
        }
      ],
      'type': 'Server_DH_Params'
    },
    {
      'id': '-1249309254',
      'predicate': 'server_DH_inner_data',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'g',
          'type': 'int'
        },
        {
          'name': 'dh_prime',
          'type': 'bytes'
        },
        {
          'name': 'g_a',
          'type': 'bytes'
        },
        {
          'name': 'server_time',
          'type': 'int'
        }
      ],
      'type': 'Server_DH_inner_data'
    },
    {
      'id': '1715713620',
      'predicate': 'client_DH_inner_data',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'retry_id',
          'type': 'long'
        },
        {
          'name': 'g_b',
          'type': 'bytes'
        }
      ],
      'type': 'Client_DH_Inner_Data'
    },
    {
      'id': '1003222836',
      'predicate': 'dh_gen_ok',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'new_nonce_hash1',
          'type': 'int128'
        }
      ],
      'type': 'Set_client_DH_params_answer'
    },
    {
      'id': '1188831161',
      'predicate': 'dh_gen_retry',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'new_nonce_hash2',
          'type': 'int128'
        }
      ],
      'type': 'Set_client_DH_params_answer'
    },
    {
      'id': '-1499615742',
      'predicate': 'dh_gen_fail',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'new_nonce_hash3',
          'type': 'int128'
        }
      ],
      'type': 'Set_client_DH_params_answer'
    },
    {
      'id': '-212046591',
      'predicate': 'rpc_result',
      'params': [
        {
          'name': 'req_msg_id',
          'type': 'long'
        },
        {
          'name': 'result',
          'type': 'Object'
        }
      ],
      'type': 'RpcResult'
    },
    {
      'id': '558156313',
      'predicate': 'rpc_error',
      'params': [
        {
          'name': 'error_code',
          'type': 'int'
        },
        {
          'name': 'error_message',
          'type': 'string'
        }
      ],
      'type': 'RpcError'
    },
    {
      'id': '1579864942',
      'predicate': 'rpc_answer_unknown',
      'params': [

      ],
      'type': 'RpcDropAnswer'
    },
    {
      'id': '-847714938',
      'predicate': 'rpc_answer_dropped_running',
      'params': [

      ],
      'type': 'RpcDropAnswer'
    },
    {
      'id': '-1539647305',
      'predicate': 'rpc_answer_dropped',
      'params': [
        {
          'name': 'msg_id',
          'type': 'long'
        },
        {
          'name': 'seq_no',
          'type': 'int'
        },
        {
          'name': 'bytes',
          'type': 'int'
        }
      ],
      'type': 'RpcDropAnswer'
    },
    {
      'id': '155834844',
      'predicate': 'future_salt',
      'params': [
        {
          'name': 'valid_since',
          'type': 'int'
        },
        {
          'name': 'valid_until',
          'type': 'int'
        },
        {
          'name': 'salt',
          'type': 'long'
        }
      ],
      'type': 'FutureSalt'
    },
    {
      'id': '-1370486635',
      'predicate': 'future_salts',
      'params': [
        {
          'name': 'req_msg_id',
          'type': 'long'
        },
        {
          'name': 'now',
          'type': 'int'
        },
        {
          'name': 'salts',
          'type': 'vector<future_salt>'
        }
      ],
      'type': 'FutureSalts'
    },
    {
      'id': '880243653',
      'predicate': 'pong',
      'params': [
        {
          'name': 'msg_id',
          'type': 'long'
        },
        {
          'name': 'ping_id',
          'type': 'long'
        }
      ],
      'type': 'Pong'
    },
    {
      'id': '-501201412',
      'predicate': 'destroy_session_ok',
      'params': [
        {
          'name': 'session_id',
          'type': 'long'
        }
      ],
      'type': 'DestroySessionRes'
    },
    {
      'id': '1658015945',
      'predicate': 'destroy_session_none',
      'params': [
        {
          'name': 'session_id',
          'type': 'long'
        }
      ],
      'type': 'DestroySessionRes'
    },
    {
      'id': '-1631450872',
      'predicate': 'new_session_created',
      'params': [
        {
          'name': 'first_msg_id',
          'type': 'long'
        },
        {
          'name': 'unique_id',
          'type': 'long'
        },
        {
          'name': 'server_salt',
          'type': 'long'
        }
      ],
      'type': 'NewSession'
    },
    {
      'id': '1945237724',
      'predicate': 'msg_container',
      'params': [
        {
          'name': 'messages',
          'type': 'vector<%Message>'
        }
      ],
      'type': 'MessageContainer'
    },
    {
      'id': '1538843921',
      'predicate': 'message',
      'params': [
        {
          'name': 'msg_id',
          'type': 'long'
        },
        {
          'name': 'seqno',
          'type': 'int'
        },
        {
          'name': 'bytes',
          'type': 'int'
        },
        {
          'name': 'body',
          'type': 'Object'
        }
      ],
      'type': 'Message'
    },
    {
      'id': '-530561358',
      'predicate': 'msg_copy',
      'params': [
        {
          'name': 'orig_message',
          'type': 'Message'
        }
      ],
      'type': 'MessageCopy'
    },
    {
      'id': '812830625',
      'predicate': 'gzip_packed',
      'params': [
        {
          'name': 'packed_data',
          'type': 'bytes'
        }
      ],
      'type': 'Object'
    },
    {
      'id': '1658238041',
      'predicate': 'msgs_ack',
      'params': [
        {
          'name': 'msg_ids',
          'type': 'Vector<long>'
        }
      ],
      'type': 'MsgsAck'
    },
    {
      'id': '-1477445615',
      'predicate': 'bad_msg_notification',
      'params': [
        {
          'name': 'bad_msg_id',
          'type': 'long'
        },
        {
          'name': 'bad_msg_seqno',
          'type': 'int'
        },
        {
          'name': 'error_code',
          'type': 'int'
        }
      ],
      'type': 'BadMsgNotification'
    },
    {
      'id': '-307542917',
      'predicate': 'bad_server_salt',
      'params': [
        {
          'name': 'bad_msg_id',
          'type': 'long'
        },
        {
          'name': 'bad_msg_seqno',
          'type': 'int'
        },
        {
          'name': 'error_code',
          'type': 'int'
        },
        {
          'name': 'new_server_salt',
          'type': 'long'
        }
      ],
      'type': 'BadMsgNotification'
    },
    {
      'id': '2105940488',
      'predicate': 'msg_resend_req',
      'params': [
        {
          'name': 'msg_ids',
          'type': 'Vector<long>'
        }
      ],
      'type': 'MsgResendReq'
    },
    {
      'id': '-630588590',
      'predicate': 'msgs_state_req',
      'params': [
        {
          'name': 'msg_ids',
          'type': 'Vector<long>'
        }
      ],
      'type': 'MsgsStateReq'
    },
    {
      'id': '81704317',
      'predicate': 'msgs_state_info',
      'params': [
        {
          'name': 'req_msg_id',
          'type': 'long'
        },
        {
          'name': 'info',
          'type': 'bytes'
        }
      ],
      'type': 'MsgsStateInfo'
    },
    {
      'id': '-1933520591',
      'predicate': 'msgs_all_info',
      'params': [
        {
          'name': 'msg_ids',
          'type': 'Vector<long>'
        },
        {
          'name': 'info',
          'type': 'bytes'
        }
      ],
      'type': 'MsgsAllInfo'
    },
    {
      'id': '661470918',
      'predicate': 'msg_detailed_info',
      'params': [
        {
          'name': 'msg_id',
          'type': 'long'
        },
        {
          'name': 'answer_msg_id',
          'type': 'long'
        },
        {
          'name': 'bytes',
          'type': 'int'
        },
        {
          'name': 'status',
          'type': 'int'
        }
      ],
      'type': 'MsgDetailedInfo'
    },
    {
      'id': '-2137147681',
      'predicate': 'msg_new_detailed_info',
      'params': [
        {
          'name': 'answer_msg_id',
          'type': 'long'
        },
        {
          'name': 'bytes',
          'type': 'int'
        },
        {
          'name': 'status',
          'type': 'int'
        }
      ],
      'type': 'MsgDetailedInfo'
    }
  ],
  'methods': [
    {
      'id': '1615239032',
      'method': 'req_pq',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        }
      ],
      'type': 'ResPQ'
    },
    {
      'id': '-686627650',
      'method': 'req_DH_params',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'p',
          'type': 'bytes'
        },
        {
          'name': 'q',
          'type': 'bytes'
        },
        {
          'name': 'public_key_fingerprint',
          'type': 'long'
        },
        {
          'name': 'encrypted_data',
          'type': 'bytes'
        }
      ],
      'type': 'Server_DH_Params'
    },
    {
      'id': '-184262881',
      'method': 'set_client_DH_params',
      'params': [
        {
          'name': 'nonce',
          'type': 'int128'
        },
        {
          'name': 'server_nonce',
          'type': 'int128'
        },
        {
          'name': 'encrypted_data',
          'type': 'bytes'
        }
      ],
      'type': 'Set_client_DH_params_answer'
    },
    {
      'id': '1491380032',
      'method': 'rpc_drop_answer',
      'params': [
        {
          'name': 'req_msg_id',
          'type': 'long'
        }
      ],
      'type': 'RpcDropAnswer'
    },
    {
      'id': '-1188971260',
      'method': 'get_future_salts',
      'params': [
        {
          'name': 'num',
          'type': 'int'
        }
      ],
      'type': 'FutureSalts'
    },
    {
      'id': '2059302892',
      'method': 'ping',
      'params': [
        {
          'name': 'ping_id',
          'type': 'long'
        }
      ],
      'type': 'Pong'
    },
    {
      'id': '-213746804',
      'method': 'ping_delay_disconnect',
      'params': [
        {
          'name': 'ping_id',
          'type': 'long'
        },
        {
          'name': 'disconnect_delay',
          'type': 'int'
        }
      ],
      'type': 'Pong'
    },
    {
      'id': '-414113498',
      'method': 'destroy_session',
      'params': [
        {
          'name': 'session_id',
          'type': 'long'
        }
      ],
      'type': 'DestroySessionRes'
    },
    {
      'id': '-1835453025',
      'method': 'http_wait',
      'params': [
        {
          'name': 'max_delay',
          'type': 'int'
        },
        {
          'name': 'wait_after',
          'type': 'int'
        },
        {
          'name': 'max_wait',
          'type': 'int'
        }
      ],
      'type': 'HttpWait'
    }
  ]
}

// From https://github.com/stephenmathieson/node-tlds/blob/master/index.js
// Config.TLD = ['abogado', 'ac', 'academy', 'accountants', 'active', 'actor', 'ad', 'adult', 'ae', 'aero', 'af', 'ag', 'agency', 'ai', 'airforce', 'al', 'allfinanz', 'alsace', 'am', 'amsterdam', 'an', 'android', 'ao', 'apartments', 'aq', 'aquarelle', 'ar', 'archi', 'army', 'arpa', 'as', 'asia', 'associates', 'at', 'attorney', 'au', 'auction', 'audio', 'autos', 'aw', 'ax', 'axa', 'az', 'ba', 'band', 'bank', 'bar', 'barclaycard', 'barclays', 'bargains', 'bayern', 'bb', 'bd', 'be', 'beer', 'berlin', 'best', 'bf', 'bg', 'bh', 'bi', 'bid', 'bike', 'bingo', 'bio', 'biz', 'bj', 'black', 'blackfriday', 'bloomberg', 'blue', 'bm', 'bmw', 'bn', 'bnpparibas', 'bo', 'boo', 'boutique', 'br', 'brussels', 'bs', 'bt', 'budapest', 'build', 'builders', 'business', 'buzz', 'bv', 'bw', 'by', 'bz', 'bzh', 'ca', 'cab', 'cal', 'camera', 'camp', 'cancerresearch', 'canon', 'capetown', 'capital', 'caravan', 'cards', 'care', 'career', 'careers', 'cartier', 'casa', 'cash', 'cat', 'catering', 'cc', 'cd', 'center', 'ceo', 'cern', 'cf', 'cg', 'ch', 'channel', 'chat', 'cheap', 'christmas', 'chrome', 'church', 'ci', 'citic', 'city', 'ck', 'cl', 'claims', 'cleaning', 'click', 'clinic', 'clothing', 'club', 'cm', 'cn', 'co', 'coach', 'codes', 'coffee', 'college', 'cologne', 'com', 'community', 'company', 'computer', 'condos', 'construction', 'consulting', 'contractors', 'cooking', 'cool', 'coop', 'country', 'cr', 'credit', 'creditcard', 'cricket', 'crs', 'cruises', 'cu', 'cuisinella', 'cv', 'cw', 'cx', 'cy', 'cymru', 'cz', 'dabur', 'dad', 'dance', 'dating', 'day', 'dclk', 'de', 'deals', 'degree', 'delivery', 'democrat', 'dental', 'dentist', 'desi', 'design', 'dev', 'diamonds', 'diet', 'digital', 'direct', 'directory', 'discount', 'dj', 'dk', 'dm', 'dnp', 'do', 'docs', 'domains', 'doosan', 'durban', 'dvag', 'dz', 'eat', 'ec', 'edu', 'education', 'ee', 'eg', 'email', 'emerck', 'energy', 'engineer', 'engineering', 'enterprises', 'equipment', 'er', 'es', 'esq', 'estate', 'et', 'eu', 'eurovision', 'eus', 'events', 'everbank', 'exchange', 'expert', 'exposed', 'fail', 'farm', 'fashion', 'feedback', 'fi', 'finance', 'financial', 'firmdale', 'fish', 'fishing', 'fit', 'fitness', 'fj', 'fk', 'flights', 'florist', 'flowers', 'flsmidth', 'fly', 'fm', 'fo', 'foo', 'forsale', 'foundation', 'fr', 'frl', 'frogans', 'fund', 'furniture', 'futbol', 'ga', 'gal', 'gallery', 'garden', 'gb', 'gbiz', 'gd', 'ge', 'gent', 'gf', 'gg', 'ggee', 'gh', 'gi', 'gift', 'gifts', 'gives', 'gl', 'glass', 'gle', 'global', 'globo', 'gm', 'gmail', 'gmo', 'gmx', 'gn', 'goog', 'google', 'gop', 'gov', 'gp', 'gq', 'gr', 'graphics', 'gratis', 'green', 'gripe', 'gs', 'gt', 'gu', 'guide', 'guitars', 'guru', 'gw', 'gy', 'hamburg', 'hangout', 'haus', 'healthcare', 'help', 'here', 'hermes', 'hiphop', 'hiv', 'hk', 'hm', 'hn', 'holdings', 'holiday', 'homes', 'horse', 'host', 'hosting', 'house', 'how', 'hr', 'ht', 'hu', 'ibm', 'id', 'ie', 'ifm', 'il', 'im', 'immo', 'immobilien', 'in', 'industries', 'info', 'ing', 'ink', 'institute', 'insure', 'int', 'international', 'investments', 'io', 'iq', 'ir', 'irish', 'is', 'it', 'iwc', 'jcb', 'je', 'jetzt', 'jm', 'jo', 'jobs', 'joburg', 'jp', 'juegos', 'kaufen', 'kddi', 'ke', 'kg', 'kh', 'ki', 'kim', 'kitchen', 'kiwi', 'km', 'kn', 'koeln', 'kp', 'kr', 'krd', 'kred', 'kw', 'ky', 'kyoto', 'kz', 'la', 'lacaixa', 'land', 'lat', 'latrobe', 'lawyer', 'lb', 'lc', 'lds', 'lease', 'legal', 'lgbt', 'li', 'lidl', 'life', 'lighting', 'limited', 'limo', 'link', 'lk', 'loans', 'london', 'lotte', 'lotto', 'lr', 'ls', 'lt', 'ltda', 'lu', 'luxe', 'luxury', 'lv', 'ly', 'ma', 'madrid', 'maison', 'management', 'mango', 'market', 'marketing', 'marriott', 'mc', 'md', 'me', 'media', 'meet', 'melbourne', 'meme', 'memorial', 'menu', 'mg', 'mh', 'miami', 'mil', 'mini', 'mk', 'ml', 'mm', 'mn', 'mo', 'mobi', 'moda', 'moe', 'monash', 'money', 'mormon', 'mortgage', 'moscow', 'motorcycles', 'mov', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'museum', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nagoya', 'name', 'navy', 'nc', 'ne', 'net', 'network', 'neustar', 'new', 'nexus', 'nf', 'ng', 'ngo', 'nhk', 'ni', 'nico', 'ninja', 'nl', 'no', 'np', 'nr', 'nra', 'nrw', 'ntt', 'nu', 'nyc', 'nz', 'okinawa', 'om', 'one', 'ong', 'onl', 'ooo', 'org', 'organic', 'osaka', 'otsuka', 'ovh', 'pa', 'paris', 'partners', 'parts', 'party', 'pe', 'pf', 'pg', 'ph', 'pharmacy', 'photo', 'photography', 'photos', 'physio', 'pics', 'pictures', 'pink', 'pizza', 'pk', 'pl', 'place', 'plumbing', 'pm', 'pn', 'pohl', 'poker', 'porn', 'post', 'pr', 'praxi', 'press', 'pro', 'prod', 'productions', 'prof', 'properties', 'property', 'ps', 'pt', 'pub', 'pw', 'py', 'qa', 'qpon', 'quebec', 're', 'realtor', 'recipes', 'red', 'rehab', 'reise', 'reisen', 'reit', 'ren', 'rentals', 'repair', 'report', 'republican', 'rest', 'restaurant', 'reviews', 'rich', 'rio', 'rip', 'ro', 'rocks', 'rodeo', 'rs', 'rsvp', 'ru', 'ruhr', 'rw', 'ryukyu', 'sa', 'saarland', 'sale', 'samsung', 'sarl', 'saxo', 'sb', 'sc', 'sca', 'scb', 'schmidt', 'schule', 'schwarz', 'science', 'scot', 'sd', 'se', 'services', 'sew', 'sexy', 'sg', 'sh', 'shiksha', 'shoes', 'shriram', 'si', 'singles', 'sj', 'sk', 'sky', 'sl', 'sm', 'sn', 'so', 'social', 'software', 'sohu', 'solar', 'solutions', 'soy', 'space', 'spiegel', 'sr', 'st', 'style', 'su', 'supplies', 'supply', 'support', 'surf', 'surgery', 'suzuki', 'sv', 'sx', 'sy', 'sydney', 'systems', 'sz', 'taipei', 'tatar', 'tattoo', 'tax', 'tc', 'td', 'technology', 'tel', 'temasek', 'tennis', 'tf', 'tg', 'th', 'tienda', 'tips', 'tires', 'tirol', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'today', 'tokyo', 'tools', 'top', 'toshiba', 'town', 'toys', 'tp', 'tr', 'trade', 'training', 'travel', 'trust', 'tt', 'tui', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'university', 'uno', 'uol', 'us', 'uy', 'uz', 'va', 'vacations', 'vc', 've', 'vegas', 'ventures', 'versicherung', 'vet', 'vg', 'vi', 'viajes', 'video', 'villas', 'vision', 'vlaanderen', 'vn', 'vodka', 'vote', 'voting', 'voto', 'voyage', 'vu', 'wales', 'wang', 'watch', 'webcam', 'website', 'wed', 'wedding', 'wf', 'whoswho', 'wien', 'wiki', 'williamhill', 'wme', 'work', 'works', 'world', 'ws', 'wtc', 'wtf', '佛山', '集团', '在线', '한국', 'ভারত', '八卦', 'موقع', '公益', '公司', '移动', '我爱你', 'москва', 'қаз', 'онлайн', 'сайт', 'срб', '淡马锡', 'орг', '삼성', 'சிங்கப்பூர்', '商标', '商店', '商城', 'дети', 'мкд', '中文网', '中信', '中国', '中國', '谷歌', 'భారత్', 'ලංකා', 'ભારત', 'भारत', '网店', 'संगठन', '网络', 'укр', '香港', '台湾', '台灣', '手机', 'мон', 'الجزائر', 'عمان', 'ایران', 'امارات', 'بازار', 'الاردن', 'بھارت', 'المغرب', 'السعودية', 'مليسيا', 'شبكة', 'გე', '机构', '组织机构', 'ไทย', 'سورية', 'рус', 'рф', 'تونس', 'みんな', 'グーグル', '世界', 'ਭਾਰਤ', '网址', '游戏', 'vermögensberater', 'vermögensberatung', '企业', 'مصر', 'قطر', '广东', 'இலங்கை', 'இந்தியா', '新加坡', 'فلسطين', '政务', 'xxx', 'xyz', 'yachts', 'yandex', 'ye', 'yoga', 'yokohama', 'youtube', 'yt', 'za', 'zip', 'zm', 'zone', 'zuerich', 'zw']

// 105

// 108

// 109
Config.Schema.API = require('./schema.json');
Config.Schema.API.layer = 112;

export default Config