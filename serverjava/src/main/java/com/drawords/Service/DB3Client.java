package com.drawords.Service;

import network.db3.client.AddDocResult;
import network.db3.client.Client;
import network.db3.store.ResultSet;

import org.web3j.crypto.ECKeyPair;
import org.web3j.utils.Numeric;

import com.alibaba.fastjson.JSON;
import com.drawords.bean.Word;

import db3_database_v2_proto.Db3DatabaseV2;

import java.math.BigInteger;
import java.util.List;

public class DB3Client {

    private static DB3Client db3Client;
    private Client client;

    String db = "0xd88c1d8359d57c7485f41748679ab2038e7e8d8f";
    String col = "test";
    String db3_private_key_hex = "dc6f560254643be3b4e90a6ba85138017aadd78639fbbb43c57669067c3bbe76";

    private DB3Client() {

        String privateKeyHex = Numeric.cleanHexPrefix(db3_private_key_hex);

        BigInteger privateKeyBigInteger = new BigInteger(privateKeyHex, 16);

        ECKeyPair keyPair = ECKeyPair
                .create(privateKeyBigInteger);
        try {
            this.client = new Client("https://rollup.cloud.db3.network",
                    "https://index.cloud.db3.network", keyPair);
        } catch (Exception e) {

        }
        // update the nonce for the first time
        client.updateNonce();

    }

    public static DB3Client getInstance() {
        if (db3Client == null) {
            return new DB3Client();
        }
        return db3Client;
    }

    public AddDocResult saveToDB3(Word word) {

        System.out.println(word);

        try {
            AddDocResult addDocResult = this.client.addDoc(db, col, JSON.toJSONString(word));
            return addDocResult;
        } catch (Exception e) {

            // TODO: handle exception
        }
        return null;
    }

    public List<Db3DatabaseV2.Document> queryDoc(String query) {
        ResultSet resultSet = (ResultSet) client.runQuery(db, col, "/[word=decentralized]");
        return resultSet.getDocs();
    }

}
