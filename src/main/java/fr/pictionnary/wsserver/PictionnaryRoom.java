package fr.pictionnary.wsserver;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.websocket.server.DefaultServerEndpointConfigurator;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;


@ServerEndpoint(value="/pictionnary/{pseudo}", 
                configurator=PictionnaryRoom.EndpointConfigurator.class)
public class PictionnaryRoom {
    
    private static PictionnaryRoom singleton = new PictionnaryRoom();

    private PictionnaryRoom() {
    }

    /**
     * Acquisition de notre unique instance ChatRoom 
     */
    public static PictionnaryRoom getInstance() {
        return PictionnaryRoom.singleton;
    }

    /**
     * On maintient toutes les sessions utilisateurs dans une collection.
     */
    private Map<String, Session> sessions = Collections.synchronizedMap(new HashMap<String, Session>());
    
    /**
     * Cette m�thode est d�clench�e � chaque connexion d'un utilisateur.
     */
    @OnOpen
    public void open(Session session, @PathParam("pseudo") String pseudo ) {
    	
    	session.setMaxTextMessageBufferSize(200000);
    	
        sessions.put( session.getId(), session );
        System.out.println(pseudo + " connexion etablie");
    }

    /**
     * Cette m�thode est d�clench�e � chaque d�connexion d'un utilisateur.
     */
    @OnClose
    public void close(Session session) {
        sessions.remove( session.getId() );
        System.out.println(session.getId() + " connexion fermer");
    }

    /**
     * Cette m�thode est d�clench�e en cas d'erreur de communication.
     */
    @OnError
    public void onError(Throwable error) {
        System.out.println( "Error: " + error.getMessage() );
    }

    /**
     * Cette m�thode est d�clench�e � chaque r�ception d'un message utilisateur.
     */
    @OnMessage
    public synchronized void handleMessage(String message, Session session) {
    	sendMessage( message );
    }

    /**
     * Une m�thode priv�e, sp�cifique � notre exemple.
     * Elle permet l'envoie d'un message aux participants de la discussion.
     */
    private synchronized void sendMessage( String fullMessage ) {
        
        // On envoie le message � tout le monde.
        for( Session session : sessions.values() ) {
            try {
                session.getBasicRemote().sendText(fullMessage);
            } catch( Exception exception ) {
                System.out.println( "ERROR: cannot send message to " + session.getId() );
            }
        }       
    }
    
    /**
     * Permet de ne pas avoir une instance diff�rente par client.
     * ChatRoom est donc g�rer en "singleton" et le configurateur utilise ce singleton. 
     */
    public static class EndpointConfigurator extends DefaultServerEndpointConfigurator {
        @Override 
        @SuppressWarnings("unchecked")
        public <T> T getEndpointInstance(Class<T> endpointClass) {
            return (T) PictionnaryRoom.getInstance();
        }
    }
}