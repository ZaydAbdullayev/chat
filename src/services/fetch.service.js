import PubNub from "pubnub";

const user = JSON.parse(localStorage.getItem("user") || "{}"); // Kullanıcı bilgilerini localStorage'dan alıyoruz
const pubnub = new PubNub({
    publishKey: "pub-c-6814e740-7c8d-486b-a479-2e2fa808d187",
    subscribeKey: "sub-c-258ec15a-dc1e-4af2-bb08-d2e6e5f599a2",
    uuid: Math.random().toString(36).substring(2, 15), // UUID oluşturuyoruz
});

const channel = localStorage.getItem("channel") || 'test_channel'; // Kanal adını localStorage'dan alıyoruz

// Bağlanılan odadaki mesajı gönderme
const sendMessage = (message) => {
    const messageData = {
        message: message, // Mesaj içeriği
        timestamp: new Date().toISOString(), // Mesaj zaman damgası
        messageType: "text", // Mesaj tipi (örneğin: text, image, vb.)
        isImportant: false, // Mesajın önemli olup olmadığı
    };

    pubnub.publish(
        {
            channel: channel, // Bağlandığı odadaki kanal
            message: messageData, // Mesajı, dinamik verilerle birlikte gönderiyoruz
            ttl: 604800, // Mesajın geçerlilik süresi (saniye cinsinden)
            meta: {
                senderId: user?.userId, // Gönderen kullanıcı ID'si
                senderName: user?.nickname, // Gönderen kullanıcı adı
            }
        },
        (status) => {
            if (status.error) {
                console.error("Error sending message", status);
            }
        }
    );
};

// Eski mesajları almak
const fetchOldMessages = (count = 100) => {
    return new Promise((resolve, reject) => {
        pubnub.history(
            {
                channel: channel, // Bağlantılı kanal
                count: count, // Kaç tane mesaj almak istiyorsanız
                reverse: true, // En son mesajdan başlayarak almak için
                includeTimetoken: true, // Zaman damgasını da almak için
                includeMeta: true, // Meta bilgilerini de almak için
                includeUUIDs: true, // UUID'leri de almak için
                stringifiedTimeToken: true, // Zaman damgasını string formatında almak için
            },
            (status, response) => {
                if (status.error) {
                    reject(status.error);
                } else {
                    resolve(response.messages);
                }
            }
        );
    });
};

// Bağlanılan odadaki yeni mesajları almak
const fetchNewMessages = (callback) => {
    pubnub.addListener({
        message: function (event) {
            callback({ entry: event.message, meta: event.userMetadata, timetoken: event.timetoken }); // Yalnızca yeni mesajı geri gönderiyoruz
        },
        status: function (statusEvent) {
            if (statusEvent.category === "PNNetworkDownCategory") {
                console.error("Network is down!");
            } else if (statusEvent.category === "PNTimeoutCategory") {
                console.error("Network timeout!");
            }
        },
    });

    pubnub.subscribe({
        channels: [channel], // Abone olacağımız kanal
        channelGroups: [], // Abone olacağımız kanal grupları
        withPresence: true, // Presence bilgilerini almak için true yapıyoruz
    }); // Kullanıcıyı abone ediyoruz
};

const rooms = ["room1", "room2", "room3"]; // Çoklu oda kanalları

// Katılımcı sayısını güncellemek
// Oda başına presence dinleyicisi ekleyip kullanıcı sayısını almak
const fetchOnlineUsers = async (channel) => {
    try {
        const result = await pubnub.hereNow({
            channels: [channel],
            includeUUIDs: true, // UUID'leri de almak için
        });
        return result
    } catch (status) {
        console.log("Error fetching occupancy:", status);
    }
};

// En aktif 3 kullanıcıyı almak için mesajları takip et
const getWeeklyActiveUsers = async (room) => {
    return new Promise((resolve, reject) => {
        pubnub.history(
            {
                channel: room, // Geçmiş mesajları almak için kanal adı
                count: 100, // Son 100 mesajı alıyoruz
            },
            (status, response) => {
                if (status.error) {
                    reject(status.error);
                } else {
                    const oneWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000; // 1 hafta önce
                    const messages = response.messages.filter((msg) => {
                        return new Date(msg.timestamp).getTime() > oneWeekAgo; // 1 haftadan eski mesajları filtreliyoruz
                    });

                    // Kullanıcıların gönderdiği mesajları sayma
                    const userMessageCounts = {};

                    messages.forEach((msg) => {
                        const senderId = msg.senderId;
                        if (!userMessageCounts[senderId]) {
                            userMessageCounts[senderId] = 0;
                        }
                        userMessageCounts[senderId] += 1; // Gönderilen mesaj sayısını artırıyoruz
                    });

                    // En aktif 3 kullanıcıyı seçiyoruz
                    const activeUsers = Object.entries(userMessageCounts)
                        .sort((a, b) => b[1] - a[1]) // Mesaj sayısına göre sıralıyoruz
                        .slice(0, 3) // İlk 3 kullanıcıyı alıyoruz
                        .map(([userId, messageCount]) => ({
                            userId,
                            messageCount,
                        }));

                    resolve(activeUsers); // En aktif 3 kullanıcıyı döndürüyoruz
                }
            }
        );
    });
};

// Tüm odalar için en aktif 3 kullanıcıyı almak
const getTop3ActiveUsers = async () => {
    const results = {};
    for (const room of rooms) {
        const activeUsers = await getWeeklyActiveUsers(room);
        results[room] = activeUsers;
    }
    return results;
};

export {
    sendMessage,
    fetchOldMessages,
    fetchNewMessages,
    fetchOnlineUsers,
    getTop3ActiveUsers,
}; // Fonksiyonları dışa aktarıyoruz
pubnub.subscribe({
    withPresence: true, // Presence olaylarını almak için
    channels: [channel], // Abone olacağımız kanallar
}); // Kullanıcıyı abone ediyoruz
export default pubnub; // PubNub nesnesini dışa aktarıyoruz
